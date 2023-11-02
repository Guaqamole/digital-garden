---
tags:
  - goal
aliases: 
Type: Todo
Progress: 0
Target: 1000
Reason: Java 실력 향상, SpringBoot 사용, 성능 최적화, Python의 한계점 공부
Timespan: 2 Month
DueDate: 2023-02-01
draft: true
---

%%
Bar:: `$= dv.view('progress-bar', {file: '2023-10-24 - FastAPI vs SpringBoot API Server'})`
Projects:: `$= const projects = dv.page('2023-10-24 - FastAPI vs SpringBoot API Server').file.inlinks.where(p => { const mp = dv.page(p.path); return mp.tags?.includes('project') && mp.status === 'In Progress'}); if (projects.length > 0) { dv.header(4, projects.length > 1 ? "Projects" : "Project"); dv.list(projects) }`
%%

# Core Output
- API 개발
- HTTP 지식
- SpringBoot
- CI / CD (무중단 배포)
- ArgoCD
- Jenkins
- Debugging

# Ideas
- 참고 블로그
- https://breezymind.com/python-vs-go-vs-webflux-benchmark/

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
