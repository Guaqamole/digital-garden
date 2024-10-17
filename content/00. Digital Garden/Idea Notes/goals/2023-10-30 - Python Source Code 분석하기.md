---
tags:
  - goal
aliases: 
Type: Skills
Progress: 0
Target: 1000
Reason: Python으로 작성된 소스코드를 분석하는 습관을 가져 모든 프로그램 사용법을 익힌다.
Timespan: 1 Month
DueDate: 2023-12-31
draft: true

---

%%
Bar:: `$= dv.view('progress-bar', {file: '2023-10-30 - Python Source Code 분석하기'})`
Projects:: `$= const projects = dv.page('2023-10-30 - Python Source Code 분석하기').file.inlinks.where(p => { const mp = dv.page(p.path); return mp.tags?.includes('project') && mp.status === 'In Progress'}); if (projects.length > 0) { dv.header(4, projects.length > 1 ? "Projects" : "Project"); dv.list(projects) }`
%%

# Core Output

- 

# Ideas
- 예시) https://engineering.linecorp.com/ko/blog/data-engineering-with-airflow-k8s-1

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
