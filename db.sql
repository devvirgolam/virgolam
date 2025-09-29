-- users (primary auth + role)
CREATE TABLE users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  username VARCHAR(80) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(150),
  phone VARCHAR(20),
  role_id INT NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,   -- Admin, Editor, Dealer, Public
  description VARCHAR(255)
);

-- addresses used by users/stores/dealers (shared)
CREATE TABLE addresses (
  id CHAR(36) PRIMARY KEY,
  owner_type ENUM('user','store','dealer') NOT NULL,
  owner_id CHAR(36) NOT NULL,
  street VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  pincode VARCHAR(20),
  lat DOUBLE NULL,
  lng DOUBLE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- dealers & stores
CREATE TABLE dealers (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE,
  company_name VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stores (
  id CHAR(36) PRIMARY KEY,
  dealer_id CHAR(36),
  name VARCHAR(200),
  phone VARCHAR(50),
  address_id CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (dealer_id) REFERENCES dealers(id)
);

-- catalogues (PDFs)
CREATE TABLE catalogues (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  pdf_url VARCHAR(1024),
  banner_image_url VARCHAR(1024),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
