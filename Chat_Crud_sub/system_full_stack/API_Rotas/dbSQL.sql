create database chat_dinamico
default character set utf8
default collate utf8_general_ci;

use chat_dinamico;

create table accout_client(
	id int primary key auto_increment,
    nome_user varchar(20),
    email varchar(100),
    senha varchar(70)
);

select * from account_client;

select email from account_client
where email = "alma_mormon_org@gmail.com";

select id, senha from account_client
where email = "alma_mormon_org@gmail.com";

delete from account_client 
where id = 8;

update account_client
set email = "carlos.souza@gmail.com"
where id = 4;

alter table accout_client
rename account_client;