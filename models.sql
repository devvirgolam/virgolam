Table users {
  id char(36) [pk]
  username varchar(80) [not null, unique]
  email varchar(150) [not null, unique]
  password varchar(255) [not null]
  name varchar(150)
  phone varchar(20)
  role_id int [ref: > roles.id]
  is_active boolean [default: true]
  created_at timestamp [default: `current_timestamp`]
  updated_at timestamp
}

Table roles {
  id int [pk, increment]
  name varchar(50) [not null, unique]
}

Table addresses {
  id char(36) [pk]
  owner_type enum('user','store','dealer') [not null]
  owner_id char(36) // polymorphic, cannot strict FK
  street varchar(255)
  city varchar(100)
  state varchar(100)
  country varchar(100)
  pincode varchar(20)
  created_at timestamp [default: `current_timestamp`]
}

Table dealers {
  id char(36) [pk]
  name varchar(200) [not null]
  slug varchar(200) [unique]
  company_name varchar(200)
  created_at timestamp [default: `current_timestamp`]
}

Table stores {
  id char(36) [pk]
  dealer_id char(36) [ref: > dealers.id]
  name varchar(200)
  phone varchar(50)
  address_id char(36) [ref: > addresses.id]
  created_at timestamp [default: `current_timestamp`]
}

Table catalogues {
  id char(36) [pk]
  name varchar(255) [not null]
  pdf_url varchar(1024)
  banner_image_url varchar(1024)
  created_at timestamp [default: `current_timestamp`]
  updated_at timestamp
}

Table categories {
  id char(36) [pk]
  name varchar(200) [not null]
  slug varchar(200) [unique]
  parent_id char(36) [ref: > categories.id]
  created_at timestamp [default: `current_timestamp`]
  updated_at timestamp
}

Table products {
  id char(36) [pk]
  name varchar(255) [not null]
  slug varchar(255) [unique]
  sku varchar(100) [unique]
  category_id char(36) [ref: > categories.id]
  description text
  images text
  seo text
  created_at timestamp [default: `current_timestamp`]
  updated_at timestamp
}

Table variants {
  id char(36) [pk]
  product_id char(36) [ref: > products.id]
  name varchar(150)
  sku varchar(100) [unique]
  price decimal(10,2)
  stock int
  attributes text
  images text
  created_at timestamp [default: `current_timestamp`]
}

Table blogs {
  id char(36) [pk]
  title varchar(255) [not null]
  slug varchar(255) [unique]
  category char(36) [ref: > blog_categories.id]
  content text
  excerpt text
  bannerImage varchar(1024)
  images text
  seo text
  publishedAt datetime
  status enum('draft','published','archived') [default: 'draft']
  createdBy char(36) [ref: > users.id]
  createdAt datetime [default: `current_timestamp`]
  updatedAt datetime
}

Table blog_categories {
  id char(36) [pk]
  name varchar(255) [not null]
}

Table contacts {
  id char(36) [pk]
  name varchar(200)
  email varchar(150)
  phoneNumber varchar(20)
  message text
  city varchar(100)
  state varchar(100)
  country varchar(100)
  pincode varchar(20)
  createdAt datetime [default: `current_timestamp`]
  notified boolean [default: false]
}

Table career_submissions {
  id char(36) [pk]
  fullName varchar(200)
  mobileNumber varchar(20)
  age int
  email varchar(150)
  resumeUrl varchar(1024)
  message text
  appliedFor varchar(200)
  createdAt datetime [default: `current_timestamp`]
}

Table pages {
  id char(36) [pk]
  title varchar(200) [not null]
  slug varchar(200) [unique]
  content text
  seo text
  status enum('draft','published')
  created_at timestamp [default: `current_timestamp`]
  updated_at timestamp
}

Table newsletter {
  id char(36) [pk]
  email varchar(150) [not null, unique]
  status enum('subscribed','unsubscribed')
  created_at timestamp [default: `current_timestamp`]
}

Table reviews {
  id char(36) [pk]
  entity_type enum('product','dealer','store','blog') // polymorphic
  entity_id char(36)
  user_id char(36) [ref: > users.id]
  rating tinyint
  comment text
  created_at timestamp [default: `current_timestamp`]
}

Table tags {
  id char(36) [pk]
  name varchar(100) [not null, unique]
  created_at timestamp [default: `current_timestamp`]
}

Table notifications {
  id char(36) [pk]
  title varchar(200)
  message text
  user_id char(36) [ref: > users.id]
  is_read boolean [default: false]
  created_at timestamp [default: `current_timestamp`]
}

Table audit_logs {
  id char(36) [pk]
  admin_id char(36) [ref: > users.id]
  action varchar(200)
  entity varchar(100)
  entity_id char(36)
  ip_address varchar(50)
  created_at timestamp [default: `current_timestamp`]
}

Table settings {
  id char(36) [pk]
  key varchar(100) [unique]
  value text
  updated_at timestamp
}

Table analytics {
  id char(36) [pk]
  metric varchar(100)
  value double
  period enum('daily','weekly','monthly','yearly')
  created_at timestamp [default: `current_timestamp`]
}
Table leads {
  id char(36) [pk]
  name varchar(200) [not null]                // Lead person name
  email varchar(150)                          // Contact email
  phone varchar(20)                           // Contact phone
  message text                                // Inquiry / requirement
  source enum('website','landing_page','ad','newsletter','referral','other') [default: 'website']
  status enum('new','contacted','qualified','converted','lost') [default: 'new']
  assigned_to char(36) [ref: > users.id]      // Sales rep or admin responsible
  created_at timestamp [default: `current_timestamp`]
  updated_at timestamp
}

Table lead_notes {
  id char(36) [pk]
  lead_id char(36) [ref: > leads.id]
  user_id char(36) [ref: > users.id]          // Sales/admin who added note
  note text
  created_at timestamp [default: `current_timestamp`]
}
 
Table lead_activities {
  id char(36) [pk]
  lead_id char(36) [ref: > leads.id]
  activity_type enum('call','email','meeting','followup','other')
  description text
  scheduled_at datetime
  completed boolean [default: false]
  created_by char(36) [ref: > users.id]
  created_at timestamp [default: `current_timestamp`]
}
