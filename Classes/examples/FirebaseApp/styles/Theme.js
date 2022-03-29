
import { StyleSheet } from 'react-native';
const COLORS = {
  DEFAULT: '#888888',
  PRIMARY: '#142550',
  LABEL: '#FE2472',
  INFO: '#2CA8FF',
  ERROR: '#FF3636',
  SUCCESS: '#18ce0f',
  WARNING: '#FFB236',
  SECONDARY: '#444444',
  NEUTRAL: 'rgba(255, 255, 255, 0.2)',
  TABS: 'rgba(222, 222, 222, 0.3)',
  TEXT: '#32325D',
  MUTED: '#8898AA',
  INPUT: '#DCDCDC',
  INPUT_SUCCESS: '#1be611',
  INPUT_ERROR: '#ff3636',
  ACTIVE: '#142550',
  BUTTON_COLOR: '#9C26B0',
  PLACEHOLDER: '#9FA5AA',
  THUMB_SWITCH_ON: '#142550',
  THUMB_SWITCH_ON: '#fff',
  SWITCH_ON: '#142550',
  SWITCH_OFF: '#898989',
  GRADIENT_START: '#aad8e0',
  GRADIENT_END: '#13244f',
  GRADIENT_RADIAL:['#FFF','#CBDCE3',"#86ADBD","#3E5879","#142550"],
  GRADIENT_PLUM:["#142550","#D92D7B"],
  GRADIENT_SILVER:["#FFF","#E2E2E2"],
  PLUM_BLUE:'#727D96',
  MARINE_BLUE:'#142550',
  CHERRY:'#D92D7B',
  CHERRY_BRIGHT:'#D05A90',
  PRICE_COLOR: '#EAD5FB',
  BORDER_COLOR: '#E7E7E7',
  GRAY_LIGHT:'#ECF1F8',
  GRAY_DARK:'#BDBDBD',
  BLOCK: '#E7E7E7',
  ICON: '#172B4D',
  ICON_INPUT: '#555555',
  TIME: '#9a9a9a',
  HEADER: '#2c2c2c',
  BORDER: '#CAD1D7',
  WHITE: '#FFFFFF',
  BLACK: '#2E2E2E',
  TWITTER: '#55acee',
  FACEBOOK: '#3b5998',
  DRIBBBLE: '#ea4c89',
  LINKEDIN: '#0077B5',
  PINTEREST: '#cc2127',
  YOUTUBE: '#e52d27',
  TUMBLR: '#35465c',
  GITHUB: '#333333',
  BEHANCE: '#1769ff',
  REDDIT: '#ff4500',
  GOOGLE: '#dd4b39'
};

const FONT_REGULAR = {
  fontFamily: 'muktamalar-regular'
};
const FONT_EXTRALIGHT = {
  fontFamily: 'muktamalar-extralight'
};

const FONT_LIGHT = {
  fontFamily: 'muktamalar-light'
};

const FONT_MEDIUM = {
  fontFamily: 'muktamalar-medium'
};
const FONT_SEMIBOLD = {
  fontFamily: 'muktamalar-semibold'
};
const FONT_BOLD = {
  fontFamily: 'muktamalar-bold'
};


const FONTS = {
  BODY: {
    ...FONT_REGULAR,
    fontSize: 21,
    lineHeight:25,
  },
  BODY_BOLD: {
    ...FONT_BOLD,
    fontSize: 12,
    lineHeight:16
  },
  BODY_MD: {
    ...FONT_REGULAR,
    fontSize: 15,
    lineHeight:18,
  },
  BODY_SML: {
    ...FONT_REGULAR,
    fontSize: 11,
    lineHeight:14,
  },
  BODY_BOLD: {
    ...FONT_MEDIUM,
    fontSize: 16,
    lineHeight:19,
  },
  HEADER_1: {
    ...FONT_BOLD,
    fontSize: 50, 
    lineHeight:60
  },
  HEADER_2: {
    ...FONT_SEMIBOLD,
    fontSize: 24, 
    lineHeight:40
  },
  HEADER_3: {
    ...FONT_MEDIUM,
    fontSize: 24, 
    lineHeight:30,
  },
  HEADER_4: {
    ...FONT_SEMIBOLD,
    fontSize: 35, 
    lineHeight:40
  },
  LINK:{
    ...FONT_REGULAR,
    color:'#3871AF',
    fontSize: 11, 
    lineHeight:14,
  }
}


const SIZES = {
  BASE: 16,
  FONT: 16,
  OPACITY: 0.8,
  BLOCK_PADDING:16,
  BLOCK_MARGIN:16,
};

const CONTAINER = {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: 'center'
}

const BLOCK_CONTAINER = {
  borderRadius: 20,
  margin:SIZES.BLOCK_MARGIN,
  backgroundColor:'#FFF',
  padding:SIZES.BLOCK_PADDING,
  shadowColor: '#8898AA',
  shadowOffset: { width: 2, height: 3 },
  shadowRadius: 6,
  shadowOpacity: 0.6
}


const BLOCK_CONTAINER_TRANSPARENT = {
  borderRadius: 20,
  margin:SIZES.BLOCK_MARGIN,
  backgroundColor:'transparent',
  padding:SIZES.BLOCK_PADDING,
  
}

const CONTENT = {
  padding:SIZES.BLOCK_PADDING,
}

const Theme = {
  COLORS,
  SIZES,
  FONTS,
  FONT_REGULAR,
  FONT_BOLD,
  FONT_EXTRALIGHT,
  FONT_LIGHT,
  FONT_MEDIUM,
  FONT_SEMIBOLD,
  CONTAINER,
  BLOCK_CONTAINER,
  BLOCK_CONTAINER_TRANSPARENT,
  CONTENT,
}




const globalStyle = StyleSheet.create({
  container:{
    ...Theme.CONTAINER,
    height:'100%'
  },
  paragraph:{
    ...Theme.HEADER_2,
    color:Theme.COLORS.CHERRY,
    margin: 8,
  },
  block:Theme.BLOCK_CONTAINER,
  row:{
    flexDirection:'row'
  },
  roundButton: {
    width: 100,
    //height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin:10,
    borderRadius: 20,
    backgroundColor: '#CCC',
  },
  header:{
    fontSize:24,
    fontWeight:'bold',
    margin:24
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:'90%',

  },
  separator: {
    width:'100%',
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

});


export {Theme,globalStyle};
