const {Router}=require('express')
const { Employee } = require('../model/employee.model')


const EmployeeRoute=Router()


EmployeeRoute.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 5, department, search } = req.query;
        const query = {};
        if (department) {
          query.department = department;
        }
        if (search) {
          query.firstName = { $regex: search, $options: 'i' };
        }
        const employees = await Employee.find(query)
          .skip((page - 1) * limit)
          .limit(limit);
        res.json(employees);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  EmployeeRoute.get('/sort/:sortType', async (req, res) => {
    try {
      const { sortType } = req.params;
      const employees = await Employee.find().sort({ salary: sortType });
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  EmployeeRoute.post('/', async (req, res) => {
    try {
      const { firstName, lastName, email, department, salary } = req.body;
      const employee = new Employee({
        firstName,
        lastName,
        email,
        department,
        salary,
      });
      await employee.save();
      res.send(employee)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  EmployeeRoute.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, department, salary } = req.body;
      const employee = await Employee.findByIdAndUpdate(
        id,
        { firstName, lastName, email, department, salary },
        { new: true }
      );
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  EmployeeRoute.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });



  module.exports={EmployeeRoute}