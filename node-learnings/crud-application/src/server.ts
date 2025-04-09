import app from "./app";

const port = process.env.DB_PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
