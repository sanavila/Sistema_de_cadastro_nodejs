create database loginSystem
default character set utf8 
default collate utf8_general_ci;

use loginSystem;

create table login (
    nome varchar(60),
    email varchar(60),
    senha varchar(10), 
    lembrete varchar(10),
    primary key (nome)
);

describe login;

