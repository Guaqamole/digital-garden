---
tags:
  - goal
aliases: 
Type: Project
Progress: 100
Target: 1000
Reason: To Improve Dev Skills, Read More Codes
Timespan: 1 Year
DueDate: 2024-06-01
draft: true
---

%%
Bar:: `$= dv.view('progress-bar', {file: '2023-10-23 - 오픈 소스 프로젝트 Contribute하기'})`
Projects:: `$= const projects = dv.page('2023-10-23 - 오픈 소스 프로젝트 Contribute하기').file.inlinks.where(p => { const mp = dv.page(p.path); return mp.tags?.includes('project') && mp.status === 'In Progress'}); if (projects.length > 0) { dv.header(4, projects.length > 1 ? "Projects" : "Project"); dv.list(projects) }`
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
