import faker from 'faker';
import datos from '../datos';

for (let i=0; i<10; i++) {
  datos.models.cliente.create({
    cedula: faker.random.number({min:5000000, max:25000000}),
    nombre: faker.name.findName(),
    telefono: faker.phone.phoneNumber(),
  });
}

for (let i=0; i<50; i++) {
  datos.models.articulo.create({
    descripcion: faker.commerce.productName(),
    precio: faker.finance.amount(1000,80000,2),
    stock: faker.random.number({min:1, max:100}),
  });
}