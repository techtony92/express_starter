import express from "express";
const PORT: string = process.env.PORT || "3300";
const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.listen(PORT, () => {
	console.log(`Server Running on PORT ${PORT}`);
});
