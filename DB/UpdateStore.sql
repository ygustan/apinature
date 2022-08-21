CREATE TABLE Produit(
   Id_produit INT NOT NULL AUTO_INCREMENT,
   Nom_produit VARCHAR(50) NOT NULL,
   Quantite INT NOT NULL,
   Description_produit TEXT NOT NULL,
   Prix_unitaire DECIMAL(15,2) NOT NULL,
   Image_produit TEXT,
   PRIMARY KEY(Id_produit)
);

CREATE TABLE Newsletter(
   Id_mail INT NOT NULL AUTO_INCREMENT,
   Mail VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_mail)
);

CREATE TABLE Categorie_produit(
   Id_catego_produit INT NOT NULL AUTO_INCREMENT,
   Nom_categorie VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_catego_produit)
);

CREATE TABLE lien_produit(
   Id_produit INT,
   Id_catego_produit INT,
   PRIMARY KEY(Id_produit, Id_catego_produit),
   FOREIGN KEY(Id_produit) REFERENCES Produit(Id_produit),
   FOREIGN KEY(Id_catego_produit) REFERENCES Categorie_produit(Id_catego_produit)
);
