import { NextApiRequest, NextApiResponse } from "next";

export default (req :NextApiRequest, res :NextApiResponse) => {

  const users = [
    { id: 1, name: 'John Cena'},
    { id: 2, name: 'Orton'},
    { id: 3, name: 'HHH'},
  ]

  res.json(users);
}