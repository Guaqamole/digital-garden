---
tags:
  - project
aliases: 
status: 
subtitle: {{VALUE:Project Subtitle}}
draft: true
---

%%
```js quickadd
const goalNotes = DataviewAPI.pages("#goal").where(
    (p) => !p.file.path.includes("template")
).values;
const targetGoal = await this.quickAddApi.suggester(
    goalNotes.map((p) => p.file.name),
    goalNotes
);
const targetGoalFile = app.vault.getAbstractFileByPath(targetGoal.file.path);
let markdownLink = this.app.fileManager.generateMarkdownLink(
    targetGoalFile,
    ""
);
markdownLink = `${markdownLink.slice(0, markdownLink.length - 2)}|${
targetGoal.aliases
}${markdownLink.slice(markdownLink.length - 2)}`;
return `Goal:: ${markdownLink}`;
```
```js quickadd
const shouldProjectTrackProgress = await this.quickAddApi.yesNoPrompt(`Should this project track progress via markdown tasks?`, 'Enabling this will give the project note a Bar property, similarly to auto-tracked goals. The tasks are auto-tracked, so each time you check one off, you make progress.');
if (shouldProjectTrackProgress) return "Bar:: `$= dv.view('total-progress-bar', {file: '; {{VALUE:⚒ Project File Name}}'})`";
```
%%


## Project Info

## Thoughts

## Resources

## Review questions

## Tasks

-   [ ]
