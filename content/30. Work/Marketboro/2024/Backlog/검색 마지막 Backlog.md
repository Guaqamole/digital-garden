- index-template 사전 경로 수정
- es health check (not red)
- es shard health check (not red)
- log check

## 작업순서
1. ES 여러대 등록
2. S3사전 수기로 등록
3. EKS ES index-template 입력 (사전 확인)
4. 색인 endpoint 변경
5. Serving API Endpoint 변경


## R&R
BI팀 검색 인프라를 DEVOPS EKS로 이관하면서 어디까지 인프라가 관리 할 것인가? 정해야함


### 내일 할일
- 모니터링 로그 이관 (dev, stage, prod 작업)
- 문서작업