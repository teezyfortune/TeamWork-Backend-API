import conn from '../index';
import { encryptPassWord } from '../../helpers/security';
import 'dotenv/config';

const password = 'admin@$123';

const hash = encryptPassWord(password);

const Users = `INSERT INTO employees (firstName,lastName,email,password,gender,jobRole,department,address,isAdmin) VALUES('superadmin','Gabriel','gabteezy14@gmail.com', '${hash}','male','admin','administration','20, waterleaf, street', true) RETURNING id, email`;

const employeesTableQuery =
  'DROP TABLE IF EXISTS employees CASCADE; CREATE TABLE employees (id serial NOT NULL PRIMARY KEY, firstName VARCHAR NOT NULL, lastName VARCHAR NOT NULL,email VARCHAR NOT NULL,password VARCHAR NOT NULL,gender VARCHAR NOT NULL,jobRole VARCHAR NOT NULL,department VARCHAR NOT NULL,address VARCHAR NOT NULL,isAdmin Boolean NOT NULL, createdOn TIMESTAMP NOT NULL DEFAULT NOW());';

const articleTableQuery = `DROP TABLE IF EXISTS articles CASCADE; CREATE TABLE articles (id serial NOT NULL PRIMARY KEY,empId integer NOT NULL,title VARCHAR NOT NULL,article TEXT NOT NULL, flag Boolean DEFAULT FALSE,  createdOn TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY (empId) REFERENCES "employees" (id));`;

const gifTableQuery =
  'DROP TABLE IF EXISTS gifs CASCADE; CREATE TABLE  gifs (id serial NOT NULL PRIMARY KEY,empId integer NOT NULL,title VARCHAR NOT NULL, imageUrl VARCHAR NOT NULL,createdOn TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY (empId) REFERENCES "employees" (id));';

const articleCommentQuery =
  'DROP TABLE IF EXISTS articles_comments CASCADE; CREATE TABLE articles_comments (id serial NOT NULL PRIMARY KEY,articleId integer NOT NULL, empId integer NOT NULL,title VARCHAR NOT NULL, article TEXT NOT NULL, comment TEXT NOT NULL, createdOn TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY (empId) REFERENCES "employees" (id), FOREIGN KEY (articleId) REFERENCES "articles" (id));';

const gifCommentQuery =
  'DROP TABLE IF EXISTS gifs_comments CASCADE; CREATE TABLE gifs_comments (id serial NOT NULL PRIMARY KEY, gifId integer NOT NULL, empId integer NOT NULL,title VARCHAR NOT NULL, comment TEXT NOT NULL,createdOn TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY (empId) REFERENCES "employees" (id), FOREIGN KEY (gifId) REFERENCES "gifs" (id));';

const sharedArticleQuery =
  'DROP TABLE IF EXISTS shared_articles; CREATE TABLE shared_articles (id serial NOT NULL PRIMARY KEY,empId integer NOT NULL,articleId integer NOT NULL,sharedOn TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY (empId) REFERENCES "employees" (id),  FOREIGN KEY (articleId) REFERENCES "articles" (id) );';

const sharedGifQuery =
  'DROP TABLE IF EXISTS shared_gifs; CREATE TABLE shared_gifs (id serial NOT NULL PRIMARY KEY,empId integer NOT NULL,gifId integer NOT NULL,sharedOn TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY (empId) REFERENCES "employees" (id));';

const gifQueryFlag =
  'DROP TABLE IF EXISTS flagGif CASCADE; CREATE TABLE flagGif (id serial NOT NULL PRIMARY KEY, gifId integer NOT NULL,empId integer NOT NULL,flaggedOn TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY (empId) REFERENCES "employees" (id), FOREIGN KEY (gifId) REFERENCES "gifs" (id));';
const articleQueryFlag =
  'DROP TABLE IF EXISTS flagArticle CASCADE; CREATE TABLE flagArticle (id serial NOT NULL PRIMARY KEY,articleId integer NOT NULL, empId integer NOT NULL,flaggedOn TIMESTAMP NOT NULL DEFAULT NOW(), FOREIGN KEY (empId) REFERENCES "employees" (id), FOREIGN KEY (articleId) REFERENCES "articles" (id));';

const allQuery = `${employeesTableQuery}${articleTableQuery}${articleQueryFlag}${gifQueryFlag}${gifTableQuery}${articleCommentQuery} ${gifCommentQuery} ${sharedArticleQuery} ${sharedGifQuery}${Users}`;
// const flagQuery = ``;

try {
  conn.query(allQuery);
} catch (error) {
  throw new Error('something weent wrong');
}
