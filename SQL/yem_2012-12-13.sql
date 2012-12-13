# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.25)
# Database: yem
# Generation Time: 2012-12-13 23:38:04 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table yem_animation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_animation`;

CREATE TABLE `yem_animation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `characteristics` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_animation` WRITE;
/*!40000 ALTER TABLE `yem_animation` DISABLE KEYS */;

INSERT INTO `yem_animation` (`id`, `characteristics`)
VALUES
	(1,'{\"color\":\"red\"}');

/*!40000 ALTER TABLE `yem_animation` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_answer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_answer`;

CREATE TABLE `yem_answer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `keywords` text,
  `idQuestion` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idQuestion` (`idQuestion`),
  CONSTRAINT `yem_answer_ibfk_1` FOREIGN KEY (`idQuestion`) REFERENCES `yem_question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_answer` WRITE;
/*!40000 ALTER TABLE `yem_answer` DISABLE KEYS */;

INSERT INTO `yem_answer` (`id`, `content`, `keywords`, `idQuestion`)
VALUES
	(1,'Au Brésil','',1),
	(2,'Au Maroc',NULL,1),
	(3,'Au Japon',NULL,1),
	(4,'En Sibérie',NULL,1);

/*!40000 ALTER TABLE `yem_answer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_answer_informs_about_state
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_answer_informs_about_state`;

CREATE TABLE `yem_answer_informs_about_state` (
  `idAnswer` int(11) unsigned NOT NULL DEFAULT '0',
  `idState` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`idAnswer`,`idState`),
  KEY `idState` (`idState`),
  CONSTRAINT `yem_answer_informs_about_state_ibfk_2` FOREIGN KEY (`idState`) REFERENCES `yem_state` (`id`),
  CONSTRAINT `yem_answer_informs_about_state_ibfk_1` FOREIGN KEY (`idAnswer`) REFERENCES `yem_answer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_answer_informs_about_state` WRITE;
/*!40000 ALTER TABLE `yem_answer_informs_about_state` DISABLE KEYS */;

INSERT INTO `yem_answer_informs_about_state` (`idAnswer`, `idState`)
VALUES
	(4,1),
	(1,2),
	(2,2),
	(3,5),
	(4,7);

/*!40000 ALTER TABLE `yem_answer_informs_about_state` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_feeling
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_feeling`;

CREATE TABLE `yem_feeling` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  `idAnimation` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idAnimation` (`idAnimation`),
  CONSTRAINT `yem_feeling_ibfk_1` FOREIGN KEY (`idAnimation`) REFERENCES `yem_animation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_feeling` WRITE;
/*!40000 ALTER TABLE `yem_feeling` DISABLE KEYS */;

INSERT INTO `yem_feeling` (`id`, `name`, `idAnimation`)
VALUES
	(4,'Croustillant',1),
	(5,'Salé',1),
	(6,'Sucré',1),
	(7,'Amer',1),
	(8,'Acide',1),
	(9,'Fondant',1),
	(10,'Pétillant',1),
	(11,'Fort',1),
	(12,'Fade',1);

/*!40000 ALTER TABLE `yem_feeling` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_group`;

CREATE TABLE `yem_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `noTable` smallint(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_group` WRITE;
/*!40000 ALTER TABLE `yem_group` DISABLE KEYS */;

INSERT INTO `yem_group` (`id`, `noTable`)
VALUES
	(1,14);

/*!40000 ALTER TABLE `yem_group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_meat
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_meat`;

CREATE TABLE `yem_meat` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text,
  `price` text,
  `picture` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_meat` WRITE;
/*!40000 ALTER TABLE `yem_meat` DISABLE KEYS */;

INSERT INTO `yem_meat` (`id`, `name`, `description`, `price`, `picture`)
VALUES
	(1,'Lapin à la moutarde','Lapin de Garennes aux 3 moutardes, délicieux oui oui !','53€','http://recettes-de-chefs.ca/images/archives/les_recettes_frederic_cyr/main/00_bs_epaule_lapiin-large.jpg'),
	(2,'Poulet au Curry','Curry directement en provenance de Rungis et poulet cuit pendant 320 heures à 40 degrés.\nServi avec ses petit raisins sec très bon.','40€','http://www.delices-defrance.com/delicesmanager/images/redim/x258-mon-poulet-au-curry-34631.jpg'),
	(3,'Tartiflette','Pommes de terre élevées à air libre pour des saveurs plus libérées','25€','http://chefpatate.fr/wp-content/uploads/2011/07/Tartiflette-traditionnelle-300x200.jpg'),
	(4,'Ratatouille','Vous avez vu le film ?','36€','http://images.cuisineaz.com/bandeaux-recherche/2011/ratatouille.jpg'),
	(5,'Crème Brulée','La crème de la crème','17€','http://icu.linter.fr/270/320717/1376409196/creme-brulee.jpg');

/*!40000 ALTER TABLE `yem_meat` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_meat_gives_feeling
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_meat_gives_feeling`;

CREATE TABLE `yem_meat_gives_feeling` (
  `idMeat` int(11) unsigned NOT NULL DEFAULT '0',
  `idFeeling` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`idMeat`,`idFeeling`),
  KEY `idFeeling` (`idFeeling`),
  CONSTRAINT `yem_meat_gives_feeling_ibfk_2` FOREIGN KEY (`idFeeling`) REFERENCES `yem_feeling` (`id`),
  CONSTRAINT `yem_meat_gives_feeling_ibfk_1` FOREIGN KEY (`idMeat`) REFERENCES `yem_meat` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_meat_gives_feeling` WRITE;
/*!40000 ALTER TABLE `yem_meat_gives_feeling` DISABLE KEYS */;

INSERT INTO `yem_meat_gives_feeling` (`idMeat`, `idFeeling`)
VALUES
	(3,4),
	(1,5),
	(2,5),
	(3,5),
	(4,5),
	(2,6),
	(5,6),
	(3,9),
	(5,9),
	(1,11),
	(4,12);

/*!40000 ALTER TABLE `yem_meat_gives_feeling` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_question`;

CREATE TABLE `yem_question` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `keywords` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_question` WRITE;
/*!40000 ALTER TABLE `yem_question` DISABLE KEYS */;

INSERT INTO `yem_question` (`id`, `content`, `keywords`)
VALUES
	(1,'Où voudriez-vous partir en vacances en ce moment ?','vacances,monde,destination,lieu');

/*!40000 ALTER TABLE `yem_question` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_state
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_state`;

CREATE TABLE `yem_state` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_state` WRITE;
/*!40000 ALTER TABLE `yem_state` DISABLE KEYS */;

INSERT INTO `yem_state` (`id`, `name`)
VALUES
	(1,'Triste'),
	(2,'Joyeux'),
	(3,'En colère'),
	(4,'Ironique'),
	(5,'Pressé'),
	(6,'Fatigué'),
	(7,'Dans la lune');

/*!40000 ALTER TABLE `yem_state` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_state_is_consistent_with_state
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_state_is_consistent_with_state`;

CREATE TABLE `yem_state_is_consistent_with_state` (
  `idState1` int(11) unsigned NOT NULL DEFAULT '0',
  `idState2` int(11) unsigned NOT NULL DEFAULT '0',
  `coherence` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idState1`,`idState2`),
  KEY `idState2` (`idState2`),
  CONSTRAINT `yem_state_is_consistent_with_state_ibfk_1` FOREIGN KEY (`idState1`) REFERENCES `yem_state` (`id`),
  CONSTRAINT `yem_state_is_consistent_with_state_ibfk_2` FOREIGN KEY (`idState2`) REFERENCES `yem_state` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_state_is_consistent_with_state` WRITE;
/*!40000 ALTER TABLE `yem_state_is_consistent_with_state` DISABLE KEYS */;

INSERT INTO `yem_state_is_consistent_with_state` (`idState1`, `idState2`, `coherence`)
VALUES
	(1,2,0),
	(2,3,0);

/*!40000 ALTER TABLE `yem_state_is_consistent_with_state` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_state_leads_to_question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_state_leads_to_question`;

CREATE TABLE `yem_state_leads_to_question` (
  `idState` int(11) unsigned NOT NULL DEFAULT '0',
  `idQuestion` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`idState`,`idQuestion`),
  KEY `idQuestion` (`idQuestion`),
  CONSTRAINT `yem_state_leads_to_question_ibfk_2` FOREIGN KEY (`idQuestion`) REFERENCES `yem_question` (`id`),
  CONSTRAINT `yem_state_leads_to_question_ibfk_1` FOREIGN KEY (`idState`) REFERENCES `yem_state` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_state_leads_to_question` WRITE;
/*!40000 ALTER TABLE `yem_state_leads_to_question` DISABLE KEYS */;

INSERT INTO `yem_state_leads_to_question` (`idState`, `idQuestion`)
VALUES
	(7,1);

/*!40000 ALTER TABLE `yem_state_leads_to_question` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_state_needs_feeling
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_state_needs_feeling`;

CREATE TABLE `yem_state_needs_feeling` (
  `idState` int(11) unsigned NOT NULL DEFAULT '0',
  `idFeeling` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`idState`,`idFeeling`),
  KEY `idFeeling` (`idFeeling`),
  CONSTRAINT `yem_state_needs_feeling_ibfk_2` FOREIGN KEY (`idFeeling`) REFERENCES `yem_feeling` (`id`),
  CONSTRAINT `yem_state_needs_feeling_ibfk_1` FOREIGN KEY (`idState`) REFERENCES `yem_state` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_state_needs_feeling` WRITE;
/*!40000 ALTER TABLE `yem_state_needs_feeling` DISABLE KEYS */;

INSERT INTO `yem_state_needs_feeling` (`idState`, `idFeeling`)
VALUES
	(2,4),
	(1,5),
	(4,5),
	(7,5),
	(4,6),
	(3,7),
	(6,7),
	(2,8),
	(6,9),
	(4,10),
	(3,11),
	(1,12),
	(5,12),
	(7,12);

/*!40000 ALTER TABLE `yem_state_needs_feeling` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_user`;

CREATE TABLE `yem_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  `idGroup` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idGroup` (`idGroup`),
  CONSTRAINT `yem_user_ibfk_1` FOREIGN KEY (`idGroup`) REFERENCES `yem_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_user` WRITE;
/*!40000 ALTER TABLE `yem_user` DISABLE KEYS */;

INSERT INTO `yem_user` (`id`, `name`, `idGroup`)
VALUES
	(1,'François',1),
	(2,'Jean-Christophe',1),
	(3,'Irène',1);

/*!40000 ALTER TABLE `yem_user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_user_has_state
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_user_has_state`;

CREATE TABLE `yem_user_has_state` (
  `idUser` int(11) unsigned NOT NULL DEFAULT '0',
  `idState` int(11) unsigned NOT NULL DEFAULT '0',
  `importance` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`idUser`,`idState`),
  KEY `idState` (`idState`),
  CONSTRAINT `yem_user_has_state_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `yem_user` (`id`),
  CONSTRAINT `yem_user_has_state_ibfk_2` FOREIGN KEY (`idState`) REFERENCES `yem_state` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_user_has_state` WRITE;
/*!40000 ALTER TABLE `yem_user_has_state` DISABLE KEYS */;

INSERT INTO `yem_user_has_state` (`idUser`, `idState`, `importance`)
VALUES
	(1,5,7),
	(1,6,9),
	(2,2,6),
	(2,3,8),
	(3,2,9),
	(3,7,6);

/*!40000 ALTER TABLE `yem_user_has_state` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_user_orders_meat
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_user_orders_meat`;

CREATE TABLE `yem_user_orders_meat` (
  `idUser` int(11) unsigned NOT NULL DEFAULT '0',
  `idMeat` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`idUser`,`idMeat`),
  KEY `idMeat` (`idMeat`),
  CONSTRAINT `yem_user_orders_meat_ibfk_2` FOREIGN KEY (`idMeat`) REFERENCES `yem_meat` (`id`),
  CONSTRAINT `yem_user_orders_meat_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `yem_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
