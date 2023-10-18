import Express, { Request, Response, NextFunction } from "express";

import todoRoutes from "./routes/todos";

const app = Express();

app.use("/todos", todoRoutes);

// express에서 사용하는 미들웨어 함수
// app.use((req, res, next) => {});

// NextFunction은 요청이 다음 미들웨어로 차례로 이동하게 하는 함수
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
