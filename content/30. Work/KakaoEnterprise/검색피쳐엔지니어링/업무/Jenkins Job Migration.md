## Jenkins Job Migration
- KAS, Trending Keyword
- 다른 Jenkins로 Migration 하는 방법 물어보기


## Jobs
http://jenkins1.is.kakaocorp.com/view/kas(list)/
- http://jenkins1.is.kakaocorp.com/view/kas(list)/job/CoupangPartnersAbuse/
- http://jenkins1.is.kakaocorp.com/view/kas(list)/job/kas_straw_reprocess/
- http://jenkins1.is.kakaocorp.com/view/kas(list)/job/KasHureReprocess/
- http://jenkins1.is.kakaocorp.com/view/kas(list)/job/KasTagToTender/
- http://jenkins1.is.kakaocorp.com/view/kas(list)/job/RepeatedUrlGrouping/
- http://jenkins1.is.kakaocorp.com/view/kas(list)/job/run_repeated_urls_grouping_labelcraft_sync/

체킹해야하는 항목
- 시간대
- 알람


## kas_straw_reprocess
- 최근 6개월 이내 카카오스토리 데이터 재처리 프로세스

### TL;DR
- shell-script → palu-reprocess.py
- palu-reprocess.py
- build_dump_sld_command
- build_dump_domain_system_command
- dump-straw.py
- 

### start
```sh
TODAY=$( date +%Y%m%d )
YESTERDAY=$( date +%Y%m%d -d 'yesterday' )
COLLECTION="kakaostory"
CPS="kakao-story-1 kakao-story-2 kakao-story-3 kakao-story-4 kakao-story-5 kakao-story-channel"

for CP in ${CPS}
do
	python palu-reprocess.py -p --load-http --limit 1000000 ${COLLECTION} ${CP} $TODAY 180 $YESTERDAY
done
```


### palu-reprocess.py
```python
python palu-reprocess.py -p --load-http --limit 1000000 kakaostory kakao-story-1 20241112 180 20241111
```

argparse
```python
if __name__ == '__main__':  
    parser = argparse.ArgumentParser()  

	...
    parser.add_argument('-p', '--prod', action='store_true', default=False)
    ...
	parser.add_argument('collection', type=str)  
	parser.add_argument('cp', type=str)  
	parser.add_argument('date', type=str)  
	parser.add_argument('reprocess_days', type=int, nargs='?', default=-1)  
	parser.add_argument('end', type=str, nargs='?', default='now')
```

command
```python
sld_dump_command = build_dump_sld_command(DUMP_STRAW_COMMAND, straw_cli, prod, collection, sld_dump_path)  
make_sld_command = build_make_sld_v2_file_command(spark_submit, MAKE_DOMAIN_SYSTEM_FILE_COMMAND, sld_dump_path, sld_output_path)  
shorturl_dump_command = build_dump_shorturl_command(DUMP_STRAW_COMMAND, straw_cli, prod, collection, shorturl_dump_path)  
make_shorturl_command = build_make_shorturl_file_command(spark_submit, MAKE_DOMAIN_SYSTEM_FILE_COMMAND, shorturl_dump_path, shorturl_output_path)  
reprocess_command = build_reprocess_command(PALU_RUNNER_COMMAND, cp, date, reprocess_days, end)  
dump_static_command = build_dump_static_command(DUMP_STRAW_COMMAND, straw_cli, collection, hammer_name, date, prod, straw_host)  
diff_static_command = build_diff_static_command(spark_submit, DIFF_RESULT_COMMAND, cp,  
                                                diff_result_path, static_dump_path, reprocess_summary_path)
```

#### 1. sld data dump
```python
# 1. SLD 데이터 덤프  
STRAW_CLI = DEFAULT_COMMAND['straw-cli']  
DUMP_STRAW_COMMAND = '{}/dump-straw.py'.format(script_dir)  
def build_dump_domain_system_command(dump_straw_command, straw_cli, prod, collection, type, dump_path):  
    cp = 'domain_system'  
  
    if prod:  
        dump_static_command = 'SPARK_EXECUTOR_INSTANCES=10 {} -p --straw-cli {} -t {} dump {} {} {} {}'.format(  
            dump_straw_command, straw_cli, type, collection, cp, date, dump_path)  
    else:  
        dump_static_command = 'SPARK_EXECUTOR_INSTANCES=10 {} --straw-cli {} -t {} dump {} {} {} {}'.format(  
            dump_straw_command, straw_cli, type, collection, cp, date, dump_path)  
    return dump_static_command
```

log
```python
COMMAND: SPARK_EXECUTOR_INSTANCES=10 /hanmail/working/blog/palu/palu-runner/script/dump-straw.py -p --straw-cli straw-cli -t domains dump kakaostory domain_system 20241112 hdfs://spamhd/output/palu-runner/tmp/sld/kakaostory/20241112_01:00:02_sld.txt
```


[[Jenkins Job Migration#dump-straw.py]] 이동.

### dump-straw.py
```python
dump-straw.py -p --straw-cli straw-cli -t domains dump kakaostory domain_system 20241112 hdfs://..._sld.txt
```

argparse
```python
if __name__ == '__main__':  
    parser = argparse.ArgumentParser()  
    ...
    parser.add_argument('-t', '--types', help='Types', type=str, default='')
    parser.add_argument('-p', '--prod', action='store_true', default=False)
    ...
    # for dump action
	subparsers = parser.add_subparsers(dest='action', help='action')  
	parser_dump = subparsers.add_parser('dump', help='dump static')  
	
	parser_dump.add_argument('collection', type=str)  
	parser_dump.add_argument('cp', type=str)  
	parser_dump.add_argument('date', type=str)  
	parser_dump.add_argument('output_base_path', type=str, nargs='?')  
	...
```

dump
```python
if args.action == 'dump':  
    collection, cp, date, output_base_path = args.collection, args.cp, args.date, args.output_base_path  
    conf = CONF[collection][cp]  
    command_list = dump_straw(straw_cli, straw_host, collection, cp, date, types, output_base_path, conf)
...

def dump_straw(straw_cli, straw_host, collection, cp, date, types, output_base_path, conf):  
    if not straw_host:  
        straw_host = conf['straw_host']  
    if not types or '*' in types:  
        types = conf['types']  
    if not output_base_path:  
        output_base_path = conf['output_base_format']  
  
    output_cp = conf.get('output_cp', cp)  
  
    command_list = []  
    for type in types:  
        straw_url = 'http://{}/boxes/{}/{}'.format(straw_host, cp, type)  
        output_path = output_base_path.format(collection=collection, cp=output_cp.replace("_base",""), date=date, type=type)  
  
        # FIXME: hadoop 명령어를 이용해 해당 디렉토리를 hdfs 사용자 소유로 변경해준다. (혹은 777 모드로 변경)  
        #        straw-dump 는 STRAW Hadoop Cluster 의 Job 으로 돌기 때문에 사용자를 무조건 hdfs 로 변경해서  
        #        동작하는 듯.  
        command = '{} export --strawUrl {} --output {} --logLevel=ERROR --mode LocalSubmit'.format(straw_cli, straw_url, output_path)  
        command_list.append(command)  
    return command_list
```

`conf = CONF[collection][cp]`
```python
CONF = {  
...
    'kakaostory': {  
        'kakao-story-1': KAS_DUMP_INFO,
...


KAS_DUMP_INFO = dict(straw_host='straw.latte.daumkakao.io',  
                      output_base_format=OUTPUT_BASE_FORMAT, types=['article', 'channel'])

OUTPUT_BASE_FORMAT = 'hdfs://spamhd/input/{collection}/{cp}/static/date={date}/{type}'


```