CREATE TABLE Utilisateurs(
   Id_utilisateur INT NOT NULL AUTO_INCREMENT,
   Nom VARCHAR(50) NOT NULL,
   Prenom VARCHAR(50) NOT NULL,
   Email VARCHAR(50) NOT NULL,
   Password TEXT NOT NULL,
   Date_naissance DATE NOT NULL,
   Date_enregistrement DATETIME NOT NULL,
   Image_utilisateur TEXT NOT NULL,
   PRIMARY KEY(Id_utilisateur)
);

CREATE TABLE Categorie_animaux(
   Id_catego_animaux INT NOT NULL AUTO_INCREMENT,
   Nom VARCHAR(50) NOT NULL,
   Description_catego TEXT NOT NULL,
   PRIMARY KEY(Id_catego_animaux)
);

CREATE TABLE Actualites(
   Id_actualite INT NOT NULL AUTO_INCREMENT,
   Titre_actualite TEXT NOT NULL,
   Contenu_actualite TEXT NOT NULL,
   Date_actualite DATETIME NOT NULL,
   PRIMARY KEY(Id_actualite)
);

CREATE TABLE Categorie_actualites(
   Id_catego_actu INT NOT NULL AUTO_INCREMENT,
   Nom_categorie VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_catego_actu)
);

CREATE TABLE Type_quiz(
   Id_type INT NOT NULL AUTO_INCREMENT,
   Nom_type VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_type)
);

CREATE TABLE Questions_quiz(
   Id_question INT NOT NULL AUTO_INCREMENT,
   Question TEXT NOT NULL,
   Question_multiple BOOLEAN NOT NULL,
   PRIMARY KEY(Id_question)
);

CREATE TABLE Reponses_quiz(
   Id_reponse INT NOT NULL AUTO_INCREMENT,
   Description_reponse TEXT NOT NULL,
   Bonne_reponse BOOLEAN NOT NULL,
   PRIMARY KEY(Id_reponse)
);

CREATE TABLE Habitat_animaux(
   Id_habitat INT NOT NULL AUTO_INCREMENT,
   Nom_habitat VARCHAR(50) NOT NULL,
   Description_habitat TEXT NOT NULL,
   PRIMARY KEY(Id_habitat)
);

CREATE TABLE Regime_alimentaire(
   Id_regime INT NOT NULL AUTO_INCREMENT,
   Nom_regime VARCHAR(50) NOT NULL,
   Description_regime TEXT NOT NULL,
   PRIMARY KEY(Id_regime)
);

CREATE TABLE Role(
   Id_role INT NOT NULL AUTO_INCREMENT,
   Nom VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_role)
);

CREATE TABLE Quiz(
   Id_quiz INT NOT NULL AUTO_INCREMENT,
   Nom_quiz VARCHAR(50) NOT NULL,
   Date_quiz DATETIME NOT NULL,
   Id_type INT,
   PRIMARY KEY(Id_quiz),
   FOREIGN KEY(Id_type) REFERENCES Type_quiz(Id_type)
);

CREATE TABLE Animaux(
   Id_animal INT NOT NULL AUTO_INCREMENT,
   Image_animal TEXT NOT NULL,
   Nom_animal VARCHAR(50) NOT NULL,
   Etat_animal TEXT NOT NULL, /* Change into TEXT */
   Description_animal TEXT NOT NULL,
   Caracteristique TEXT NOT NULL,
   Esperance_vie TEXT NOT NULL,  /* Change into TEXT */
   Population TEXT NOT NULL, /* Change into TEXT */
   Poids VARCHAR(50) NOT NULL,  /* Change into TEXT */
   Taille VARCHAR(50) NOT NULL,  /* Change into TEXT */
   Id_regime INT,
   Id_catego_animaux INT,
   PRIMARY KEY(Id_animal),
   FOREIGN KEY(Id_regime) REFERENCES Regime_alimentaire(Id_regime),
   FOREIGN KEY(Id_catego_animaux) REFERENCES Categorie_animaux(Id_catego_animaux)
);

CREATE TABLE Score(
   Id_score INT NOT NULL AUTO_INCREMENT,
   Etat_score VARCHAR(50) NOT NULL,
   Json_historique JSON,
   Date_score DATETIME NOT NULL,
   Id_quiz INT NOT NULL,
   PRIMARY KEY(Id_score),
   UNIQUE(Id_quiz),
   FOREIGN KEY(Id_quiz) REFERENCES Quiz(Id_quiz)
);

CREATE TABLE lien_categorie(
   Id_actualite INT,
   Id_catego_actu INT,
   PRIMARY KEY(Id_actualite, Id_catego_actu),
   FOREIGN KEY(Id_actualite) REFERENCES Actualites(Id_actualite),
   FOREIGN KEY(Id_catego_actu) REFERENCES Categorie_actualites(Id_catego_actu)
);

CREATE TABLE lien_reponse(
   Id_question INT,
   Id_reponse INT,
   PRIMARY KEY(Id_question, Id_reponse),
   FOREIGN KEY(Id_question) REFERENCES Questions_quiz(Id_question),
   FOREIGN KEY(Id_reponse) REFERENCES Reponses_quiz(Id_reponse)
);

CREATE TABLE lien_habitat(
   Id_animal INT,
   Id_habitat INT,
   PRIMARY KEY(Id_animal, Id_habitat),
   FOREIGN KEY(Id_animal) REFERENCES Animaux(Id_animal),
   FOREIGN KEY(Id_habitat) REFERENCES Habitat_animaux(Id_habitat)
);

CREATE TABLE lien_question(
   Id_quiz INT,
   Id_question INT,
   PRIMARY KEY(Id_quiz, Id_question),
   FOREIGN KEY(Id_quiz) REFERENCES Quiz(Id_quiz),
   FOREIGN KEY(Id_question) REFERENCES Questions_quiz(Id_question)
);

CREATE TABLE lien_role(
   Id_utilisateur INT,
   Id_role INT,
   PRIMARY KEY(Id_utilisateur, Id_role),
   FOREIGN KEY(Id_utilisateur) REFERENCES Utilisateurs(Id_utilisateur),
   FOREIGN KEY(Id_role) REFERENCES Role(Id_role)
);

CREATE TABLE lien_parent(
   Id_utilisateur INT,
   Id_utilisateur_1 INT,
   PRIMARY KEY(Id_utilisateur, Id_utilisateur_1),
   FOREIGN KEY(Id_utilisateur) REFERENCES Utilisateurs(Id_utilisateur),
   FOREIGN KEY(Id_utilisateur_1) REFERENCES Utilisateurs(Id_utilisateur)
);

CREATE TABLE lien_score(
   Id_utilisateur INT,
   Id_score INT,
   PRIMARY KEY(Id_utilisateur, Id_score),
   FOREIGN KEY(Id_utilisateur) REFERENCES Utilisateurs(Id_utilisateur),
   FOREIGN KEY(Id_score) REFERENCES Score(Id_score)
);
