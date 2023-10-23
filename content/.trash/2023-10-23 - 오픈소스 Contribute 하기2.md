---
tags:
  - goal
aliases: 
Type: 
Progress: 0
Target:
  "{ VALUE:🎯 Target (number) }": 
Reason:
  "{ VALUE:Why this goal? }": 
Timespan:
  "{\n  VALUE:10 Years,\n  5 Years,\n  3 Years,\n  1 Year,\n  6 Months,\n  1 Month,\n  1 Week\n}": 
DueDate: ""
---

%%
Bar:: `$= dv.view('progress-bar', {file: '2023-10-23 - 오픈소스 Contribute 하기'})`
Projects:: `$= const projects = dv.page('2023-10-23 - 오픈소스 Contribute 하기').file.inlinks.where(p => { const mp = dv.page(p.path); return mp.tags?.includes('project') && mp.status === 'In Progress'}); if (projects.length > 0) { dv.header(4, projects.length > 1 ? "Projects" : "Project"); dv.list(projects) }`
%%

# Core Output

- 

# Ideas
- 

# Milestones

## Steps
1.
2.
3.

### Created projects

```dataviewjs
const pages = dv.current().file.inlinks.where(p => dv.page(p.path).tags?.includes('project'));

dv.table(["Project", "Status"], pages.map(p => {
	const page = dv.page(p.path);
	return [page.file.link, page.status]
}));
```
