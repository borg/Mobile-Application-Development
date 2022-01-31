## Class 2 - git basics


git is the version control system eveybody is using today. It is a beautiful system, not only for not losing work, but also for collaboration and sharing. 


![](https://cdn-media-1.freecodecamp.org/images/1*iL2J8k4ygQlg3xriKGimbQ.png)

###SSH access
To make it easier to read and write to your repo, it's useful to add a key without a password, so you don't have to type each time.

[Create local SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys)   


Add to your [github settings](https://github.com/settings/keys)

```
Make sure you ONLY ADD THE PUBLIC KEY (~/.ssh/id_rsa.pub)
```

###Workflow   
1. Create [new repo](https://github.com/new)
2. Download and install [Fork-UI](https://git-fork.com/) or use CLI
3. Clone the repo
4. Create a `README.md` file in the folder
5. `Add` new file to stage
6. `Commit` file with a `message`
7. `Push` change to `master/main repo`


When working with others, `pull` changes before you start working, and before you `push` your changes.


###If you make a mess
If you had a nice working commit when you started working, but now nothing works -> Throw away all staged and unstaged changes, forget everything on your current local branch and make it exactly the same as origin/master.


```
git reset --hard origin/master
```
###General advice
* Don't commit large files