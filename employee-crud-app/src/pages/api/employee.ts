import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      // Create Employee
      case "POST":
        const newEmployee = await prisma.employee.create({
          data: req.body,
        });
        return res.status(201).json(newEmployee);

      // Get all Employees
      case "GET":
        const employees = await prisma.employee.findMany();
        return res.status(200).json(employees);

      // Update Employee
      case "PUT":
        const { id, ...updateData } = req.body;
        const updatedEmployee = await prisma.employee.update({
          where: { id: Number(id) },
          data: updateData,
        });
        return res.status(200).json(updatedEmployee);

      // Delete Employee
      case "DELETE":
        const { deleteId } = req.body;
        await prisma.employee.delete({
          where: { id: Number(deleteId) },
        });
        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
