import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';


import { ReactNativeSVGContext, NotoFontPack } from 'standalone-vexflow-context';
import { AbcjsVexFlowRenderer } from 'abcjs-vexflow-renderer';
const { height, width } = Dimensions.get("screen");


export default class VexView extends Component{


    render(){

        let abcText = `
M: 4/4 
X: 1
T: Cooley
L: 1/8
K: Emin
subtitle:'sub',
|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|
EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|
|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|
eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|`;


//abcText = "X:1\nT:Example\nM: 4/4 \nK:Bb\nBcde|\n";

//inside https://github.com/MatthewDorner/abcjs-vexflow-renderer/blob/master/lib/main/draw-to-context.js
//I had to comment out to get it rendering
//if (bar.meter) { clefsStave.setTimeSignature(bar.meter); }

        console.log(abcText);
        let zoom = 1;
        let tuning = "GUITAR_STANDARD";//console.log(AbcjsVexFlowRenderer.TUNINGS);

    const renderOptions = {
        xOffset: 3,
        widthFactor: 1.5,
        lineHeight: 185,
        clefWidth: 40,
        meterWidth: 30,
        repeatWidthModifier: 35,
        dottedNotesModifier: 23,
        keySigAccidentalWidth: 20,
        tabsVisibility:true,
        staveVisibility:true,
        voltaHeight: 27,
        renderWidth:width * 7,// * (50 / zoom) * 1.2,//just guessing
        tuning: AbcjsVexFlowRenderer.TUNINGS[tuning],
      };
  
      let context; let exception; let content;
      
      
      try {
        const tuneObject = AbcjsVexFlowRenderer.getTune(abcText, renderOptions);
     
        const lastPart = tuneObject.parts[tuneObject.parts.length - 1];
        const lastBar = lastPart.bars[lastPart.bars.length - 1];
  
        // 1.2, .75, .90, these numbers are all related but I don't remember how, and the math could be simplified
        const contextWidth = width * 0.90;
        const contextHeight = ((lastBar.position.y + renderOptions.lineHeight) * (zoom / 50) * 0.75) + 50;
        context = new ReactNativeSVGContext(
          NotoFontPack,
          { width: contextWidth, height: contextHeight }
        );
  
        const viewBoxWidth = renderOptions.renderWidth + 6;
        const viewBoxHeight = (lastBar.position.y + renderOptions.lineHeight) + 5;
        context.setViewBox(0, 0, viewBoxWidth, viewBoxHeight);
  
        context.svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');
  
        AbcjsVexFlowRenderer.drawToContext(context, tuneObject);
      } catch (e) {
        exception = e;
      }
  
      if (!exception) {
        content = context.render();
      } else {
        content = (
          <View style={styles.errorContainer}>
            <Text>Error</Text>
            <Text>
              Code:
              {exception.code}
            </Text>
            <Text>
              Message:
              {exception.message}
            </Text>
          </View>
        );
      }



        return <View style={styles.container}>
        {content}
      </View>
    }
}


const styles = StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    errorContainer: {
      width: '80%'
    }
  });