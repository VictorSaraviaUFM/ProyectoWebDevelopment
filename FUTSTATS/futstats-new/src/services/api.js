import axios from "axios";

const API_URL = "http://localhost:5000/api";

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}


const API = axios.create({
baseURL: "https://futstats-mock-backend.vercel.app", // temporary mock
});


export const getRecentMatches = async () => {
const res = await API.get("/matches/recent");
return res.data;
};


export const getTopPlayers = async () => {
const res = await API.get("/players/top");
return res.data;
};


export const getPlayerById = async (id) => {
const res = await API.get(`/players/${id}`);
return res.data;
};


export const getOpinions = async () => {
const res = await API.get("/opinions");
return res.data;
};


export const postOpinion = async (text, user = "anon") => {
const res = await API.post("/opinions", { text, user });
return res.data;
};


export const deleteOpinion = async (id) => {
const res = await API.delete(`/opinions/${id}`);
return res.data;
};


export const loginUser = async (email, password) => {
const res = await API.post("/auth/login", { email, password });
return res.data;
};


export const registerUser = async (info) => {
const res = await API.post("/auth/register", info);
return res.data;
};


export default {
getRecentMatches,
getTopPlayers,
getPlayerById,
getOpinions,
postOpinion,
deleteOpinion,
loginUser,
registerUser,
};