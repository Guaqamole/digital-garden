---
tags:
  - goal
aliases: 
Type: Todo
Progress: 0
Target: 1000
Reason: MLEngineer로 진화하기 위한 과정.
Timespan: 1 Month
DueDate: 2023-04-01
draft: true

---

%%
Bar:: `$= dv.view('progress-bar', {file: '2023-10-24 - First Machine Learning Project'})`
Projects:: `$= const projects = dv.page('2023-10-24 - First Machine Learning Project').file.inlinks.where(p => { const mp = dv.page(p.path); return mp.tags?.includes('project') && mp.status === 'In Progress'}); if (projects.length > 0) { dv.header(4, projects.length > 1 ? "Projects" : "Project"); dv.list(projects) }`
%%

# Core Output

- GPU on K8S

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
