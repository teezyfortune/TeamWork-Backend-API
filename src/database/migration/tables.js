import conn from '../index';

export const createUserTable = async () => {
  try {
    const createEmployees = `CREATE TABLE employees (
        id serial NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        gender VARCHAR(255) NOT NULL,
        jobRole VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        isAdmin Boolean NOT NULL
        createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT Users_pk PRIMARY KEY (id)
    )`;
    const query = conn.query(createEmployees);
    if (query) {
      return true;
    }
  } catch (error) {
    return error;
  }
  conn.end();
  return false;
};

export const dropTables = async () => {
  try {
    const queryText = 'DROP TABLE IF EXISTS employees';
    const drop = await conn.query(queryText);
    if (drop) return true;
  } catch (err) {
    return err;
  }
  conn.end();
  return false;
};

export const createUserArticleTable = async () => {
  try {
    const createArticle = `CREATE TABLE Articles (
         id serial NOT NULL,
         empId integer NOT NULL,
         title VARCHAR(255) NOT NULL,
         article TEXT NOT NULL,
         createdOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
         CONSTRAINT "Articles_pk" PRIMARY KEY (id)
     ) `;
    const query = conn.query(createArticle);
    if (query) {
      return query;
    }
  } catch (error) {
    return error;
  }
  conn.end();
  return false;
};

export const dropArticle = async () => {
  try {
    const queryText = 'DROP TABLE IF EXISTS Articles';
    const drop = await conn.query(queryText);
    if (drop) return true;
  } catch (err) {
    return err;
  }
  conn.end();
  return false;
};

export const createSharedArticleTable = async () => {
  try {
    const createSharedTable = `
    CREATE TABLE shared_articles (
        id serial NOT NULL,
        empId integer NOT NULL,
        articleId integer NOT NULL,
        sharedOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT shared_articles_pk PRIMARY KEY (id)
    )`;
    const query = conn.query(createSharedTable);
    if (query) {
      return query;
    }
  } catch (error) {
    return error;
  }
  conn.end();
  return false;
};

export const dropShredArticle = async () => {
  try {
    const queryText = 'DROP TABLE IF EXISTS shared_articles';
    const drop = await conn.query(queryText);
    if (drop) return true;
  } catch (err) {
    return err;
  }
  conn.end();
  return false;
};

export const createGifShredTable = async () => {
  try {
    const createSharedTable = `
      CREATE TABLE shared_gifs (
          id serial NOT NULL,
          empId integer NOT NULL,
          gifId integer NOT NULL,
          sharedOn TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT shared_gifs_pk PRIMARY KEY (id)
      ) `;
    const query = conn.query(createSharedTable);
    if (query) {
      return query;
    }
  } catch (error) {
    return error;
  }
  conn.end();
  return false;
};

export const dropTableSharedGif = async () => {
  try {
    const queryText = 'DROP TABLE IF EXISTS shared_gifs';
    const drop = await conn.query(queryText);
    if (drop) return true;
  } catch (err) {
    return err;
  }
  conn.end();
  return false;
};

export const createRelations = async () => {
  try {
    const createAllRelations = `
      ALTER TABLE Gifs ADD CONSTRAINT Gifs_fk0 FOREIGN KEY (empId) REFERENCES employees(id);
      
      ALTER TABLE Articles ADD CONSTRAINT Articles_fk0 FOREIGN KEY (empId) REFERENCES employees(id);
      
      ALTER TABLE Article_Comments ADD CONSTRAINT Article_Comments_fk0 FOREIGN KEY (articleId) REFERENCES Articles(id);
      ALTER TABLE Article_Comments ADD CONSTRAINT Article_Comments_fk1 FOREIGN KEY (empId) REFERENCES employees(id);
      
      ALTER TABLE Gifs_Comments ADD CONSTRAINT Gifs_Comments_fk0 FOREIGN KEY (gifId) REFERENCES Gifs(id);
      ALTER TABLE Gifs_Comments ADD CONSTRAINT Gifs_Comments_fk1 FOREIGN KEY (empId) REFERENCES employees(id);
      
      ALTER TABLE shared_articles ADD CONSTRAINT shared_articles_fk0 FOREIGN KEY (empId) REFERENCES employees(id);
      ALTER TABLE shared_articles ADD CONSTRAINT shared_articles_fk1 FOREIGN KEY (articleId) REFERENCES Articles(id);
      
      ALTER TABLE shared_gifs ADD CONSTRAINT shared_gifs_fk0 FOREIGN KEY (empId) REFERENCES employees(id);
      ALTER TABLE shared_gifs ADD CONSTRAINT shared_gifs_fk1 FOREIGN KEY (gifId) REFERENCES Articles(id);
       `;
    const query = await conn.query(createAllRelations);
    if (query) {
      return query;
    }
  } catch (error) {
    return error;
  }
  conn.end();
  return false;
};

require('make-runnable');
