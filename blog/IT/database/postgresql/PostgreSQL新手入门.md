自从MySQL被Oracle收购以后，PostgreSQL逐渐成为开源关系型数据库的首选。
本文介绍PostgreSQL的安装和基本用法，供初次使用者上手。以下内容基于Debian操作系统，其他操作系统实在没有精力兼顾，但是大部分内容应该普遍适用。
postgresql
一、安装
首先，安装PostgreSQL客户端。
sudo apt-get install postgresql-client
然后，安装PostgreSQL服务器。
sudo apt-get install postgresql
正常情况下，安装完成后，PostgreSQL服务器会自动在本机的5432端口开启。


二、添加新用户和新数据库
初次安装后，默认生成一个名为postgres的数据库和一个名为postgres的数据库用户。这里需要注意的是，同时还生成了一个名为postgres的Linux系统用户。
下面，我们使用postgres用户，来生成其他用户和新数据库。好几种方法可以达到这个目的，这里介绍两种。
第一种方法，使用PostgreSQL控制台。
首先，新建一个Linux新用户，可以取你想要的名字，这里为dbuser。
sudo adduser dbuser
然后，切换到postgres用户。
sudo su - postgres
下一步，使用psql命令登录PostgreSQL控制台。
psql
这时相当于系统用户postgres以同名数据库用户的身份，登录数据库，这是不用输入密码的。如果一切正常，系统提示符会变为"postgres=#"，表示这时已经进入了数据库控制台。以下的命令都在控制台内完成。
第一件事是使用\password命令，为postgres用户设置一个密码。
\password postgres
第二件事是创建数据库用户dbuser（刚才创建的是Linux系统用户），并设置密码。
CREATE USER dbuser WITH PASSWORD 'password';
第三件事是创建用户数据库，这里为exampledb，并指定所有者为dbuser。
CREATE DATABASE exampledb OWNER dbuser;
第四件事是将exampledb数据库的所有权限都赋予dbuser，否则dbuser只能登录控制台，没有任何数据库操作权限。
GRANT ALL PRIVILEGES ON DATABASE exampledb to dbuser;
最后，使用\q命令退出控制台（也可以直接按ctrl+D）。
\q
第二种方法，使用shell命令行。
添加新用户和新数据库，除了在PostgreSQL控制台内，还可以在shell命令行下完成。这是因为PostgreSQL提供了命令行程序createuser和createdb。还是以新建用户dbuser和数据库exampledb为例。
首先，创建数据库用户dbuser，并指定其为超级用户。
sudo -u postgres createuser --superuser dbuser
然后，登录数据库控制台，设置dbuser用户的密码，完成后退出控制台。
sudo -u postgres psql
\password dbuser
\q
接着，在shell命令行下，创建数据库exampledb，并指定所有者为dbuser。
sudo -u postgres createdb -O dbuser exampledb
三、登录数据库
添加新用户和新数据库以后，就要以新用户的名义登录数据库，这时使用的是psql命令。
psql -U dbuser -d exampledb -h 127.0.0.1 -p 5432


简写形式，如果当前Linux系统用户，同时也是PostgreSQL用户，则可以省略用户名（-U参数的部分）。举例来说，我的Linux系统用户名为ruanyf，且PostgreSQL数据库存在同名用户，则我以ruanyf身份登录Linux系统后，可以直接使用下面的命令登录数据库，且不需要密码。
psql exampledb
此时，如果PostgreSQL内部还存在与当前系统用户同名的数据库，则连数据库名都可以省略。比如，假定存在一个叫做ruanyf的数据库，则直接键入psql就可以登录该数据库。
【数据库导入】
psql exampledb < exampledb.sql
四、控制台命令
除了前面已经用到的\password命令（设置密码）和\q命令（退出）以外，控制台还提供一系列其他命令。
\h：查看SQL命令的解释，比如\h select。
\?：查看psql命令列表。
\l：列出所有数据库。
\c [database_name]：连接其他数据库。
\d：列出当前数据库的所有表格。
\d [table_name]：列出某一张表格的结构。
\dt   show tables   数据数据库名就可以切换数据库
\du：列出所有用户。
\e：打开文本编辑器。
\conninfo：列出当前数据库和连接的信息。
五、数据库操作
# 创建新表
CREATE TABLE user_tbl(name VARCHAR(20), signup_date DATE);
# 插入数据
INSERT INTO user_tbl(name, signup_date) VALUES('张三', '2013-12-22');
# 选择记录
SELECT * FROM user_tbl;
# 更新数据
UPDATE user_tbl set name = '李四' WHERE name = '张三';
# 删除记录
DELETE FROM user_tbl WHERE name = '李四' ;
# 添加栏位
ALTER TABLE user_tbl ADD email VARCHAR(40);
# 更新结构
ALTER TABLE user_tbl ALTER COLUMN signup_date SET NOT NULL;
# 更名栏位
ALTER TABLE user_tbl RENAME COLUMN signup_date TO signup;
# 删除栏位
ALTER TABLE user_tbl DROP COLUMN email;
# 表格更名
ALTER TABLE user_tbl RENAME TO backup_tbl;
# 删除表格
DROP TABLE IF EXISTS backup_tbl;




ps aux | grep postgres
netstat -npl | grep postgres
重启命令：
#su - postgres
$pg_ctl restart
sudo -u postgres psql  登录pg时得用postgres用户
connect to PostgreSQL server: FATAL: no pg_hba.conf entry for host "4X.XXX.XX.XXX", user "userXXX", database "dbXXX", 
postgresql.conf      listen_addresses = '*'
pg_hba.conf        host  all  all 0.0.0.0/0 md5
需重启




【导数据】
 \o /data/account.csv    \f ',' 逗号分隔    \a  Output format is unaligned   \t Showing only tuples.


 select *  from account where server_id = 18;
psql -h 127.0.0.1 -p 5432 -U sm -Atc "select (year, month, day, hour, min, sec)::text from bigtime where serverid=99997" sm99997


echo "select * from player" | psql -X -U sm -At -F ' ' sm99997
echo "select 'select sequence_name,last_value from '|| relname||';' FROM pg_class c where c.relkind='S' order by relname" | psql -U sm -At -F ' ' sm99997
 
psql - U sm  -Atc "select ver from version where serverid=99997" sm99997
 
 
psql -U sm -d sm99997
 
 
sh m.sh 127.0.0.1:5432,99997 127.0.0.1:5432,99999
 
 
PGPASSWORD=  psql -U postgres -c "insert into version values(-1, false, 0)" sm99997


-X 的参数是去掉命令行的提示


SELECT FROM table_name
WHERE column LIKE 'XXXX%'        %代表0个或多个    _代表一个任意的字符




select sequence_name,last_value from advisorids;
取出并设置下一个seq   select nextval('advisorids');




命令行设置默认密码的，查找  在客户端设置.pgpass密码文件，Windows上是pgpass
127.0.0.1:5432:*:postgres:postgres
localhost:5432:*:postgres:postgres


【安装】


#安装postgres
yum install -y http://yum.postgresql.org/9.4/redhat/rhel-6-x86_64/pgdg-redhat94-9.4-2.noarch.rpm
yum -y install postgresql94-server postgresql94-contrib postgresql94-devel postgresql94-client
mkdir -p /data/postgresql/
chown postgres /data/postgresql/
su postgres
#  -W 加上这个参数可以设置密码  postgres
/usr/pgsql-9.4/bin/initdb --locale=C -E UTF8 -D /data/postgresql  -W  --auth=md5 --auth-host=md5 --auth-local=md5


#再回到root用户
exit


1:配置并启动数据库
vim /data/postgresql/pg_hba.conf
  本地连数据库不限制用户，限制远程访问数据库的IP，用户和数据库
  # "local" is for Unix domain socket connections only
  local  all            all                                    trust
  # IPv4 local connections:
  host    all            all            127.0.0.1/32            md5
  # IPv6 local connections:
  host    all            all            ::1/128                md5
  # backend ip connections:
  host    databk          databk          120.132.58.71/32        md5
  host    databk          databk          106.75.192.3/32        md5


vim /data/postgresql/postgresql.conf
listen_addresses = '*'
启动数据库
su postgres
启动数据库  /usr/pgsql-9.4/bin/pg_ctl -D /data/postgresql  start
关闭数据库  /usr/pgsql-9.4/bin/pg_ctl -D /data/postgresql  stop


service postgresql-9.4 start  这种启动方式postgres设置了密码也无效




修改密码
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'postgres';




psql -U rise -d rise90001

