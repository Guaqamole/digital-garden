---
tags: goal
alias: 오픈소스 Contribute 하기
Type: Project
Progress: 0
Target: 2
Reason: 개발 스펙트럼 향상
Timespan: 6 Months

---

%%
Bar:: `$= dv.view('progress-bar', {file: '2023-10-23 - 오픈소스 Contribute 하기'})`
Projects:: `$= const projects = dv.page('2023-10-23 - 오픈소스 Contribute 하기').file.inlinks.where(p => { const mp = dv.page(p.path); return mp.tags?.includes('project') && mp.status === 'In Progress'}); if (projects.length > 0) { dv.header(4, projects.length > 1 ? "Projects" : "Project"); dv.list(projects) }`
%%

## What does success look like? What are the key results?

-

## Related core values

-

## Projects to make this happen

### Ideas

-

### Created projects

```dataviewjs
const pages = dv.current().file.inlinks.where(p => dv.page(p.path).tags?.includes('project'));

dv.table(["Project", "Status"], pages.map(p => {
	const page = dv.page(p.path);
	return [page.file.link, page.status]
}));
```
