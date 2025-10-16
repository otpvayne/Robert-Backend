CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(32) NOT NULL,
  lastName VARCHAR(32) NOT NULL,
  document VARCHAR(16) UNIQUE NOT NULL,
  address VARCHAR(64),
  phone VARCHAR(20),
  email VARCHAR(64)
);

INSERT INTO users (firstName,lastName,document,address,phone,email) VALUES
('Vilma','Gómez','313233','Av 39 # 2129','300214578','vilma@correo.com'),
('Juan','Pérez','900111','Cra 10 # 12-34','310000001','juanp@example.com'),
('María','López','900112','Cll 80 # 15-20','311000002','mlopez@example.com'),
('Andrés','Rojas','900113','Cra 68 # 90-30','312000003','arojas@example.com'),
('Paula','Díaz','900114','Av Suba # 100-12','313000004','pdiaz@example.com'),
('Camilo','Suárez','900115','Cll 26 # 30-45','314000005','csuarez@example.com');
