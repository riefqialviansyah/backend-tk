# BACKEND - TK

## Deploy

- Link : https://toko-klontong-be.riefqialviansyah.com/

## list Endpoints

- `POST` /user/register -->
  register new user

- `POST` /user/login -->
  login existing user

- `GET` /product/get -->
  get all products with limit 15 data

- `GET` /product/getOne/:id -->
  get one data base on id

- `POST` /product/add -->
  add new product

- `PUT` /product/update/:id -->
  update exissting product base on id

- `DELETE` /product/delete/:id -->
  delete product base on id

## Runing app

- clone this repo `git clone https://github.com/riefqialviansyah/backend-tk.git`
- enter to folder `/be`
- install dependecy `npm i`
- change file `.env-exampe` to `.env`
- configure your database, if you use postgres you just need to set your correct password
- runing app with `npx nodemon bin/www`
