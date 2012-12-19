# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.25)
# Database: yem
# Generation Time: 2012-12-19 18:57:52 +0000
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
	(1,'{\"color\":\"red\"}'),
	(2,'{\"shape\": \"squares\"}');

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
	(4,'En Sibérie',NULL,1),
	(5,'Le feu',NULL,2),
	(6,'L\'eau',NULL,2),
	(7,'La terre',NULL,2),
	(8,'L\'air',NULL,2),
	(9,'Le bois',NULL,2),
	(10,'Le métal',NULL,2),
	(16,'La soie',NULL,4),
	(17,'Le cuir',NULL,4),
	(18,'Le coton',NULL,4),
	(19,'La fourrure',NULL,4);

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
  CONSTRAINT `yem_answer_informs_about_state_ibfk_1` FOREIGN KEY (`idAnswer`) REFERENCES `yem_answer` (`id`),
  CONSTRAINT `yem_answer_informs_about_state_ibfk_2` FOREIGN KEY (`idState`) REFERENCES `yem_state` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_answer_informs_about_state` WRITE;
/*!40000 ALTER TABLE `yem_answer_informs_about_state` DISABLE KEYS */;

INSERT INTO `yem_answer_informs_about_state` (`idAnswer`, `idState`)
VALUES
	(4,1),
	(18,1),
	(1,2),
	(2,2),
	(9,2),
	(19,2),
	(5,3),
	(10,3),
	(3,4),
	(19,4),
	(3,5),
	(5,5),
	(17,5),
	(6,6),
	(7,6),
	(4,7),
	(8,7),
	(16,8),
	(19,8);

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
	(6,'Sucré',2),
	(7,'Amer',1),
	(8,'Acide',2),
	(9,'Fondant',1),
	(10,'Pétillant',2),
	(11,'Fort',1),
	(12,'Doux',2);

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
  `idType` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idType` (`idType`),
  CONSTRAINT `yem_meat_ibfk_1` FOREIGN KEY (`idType`) REFERENCES `yem_meat_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_meat` WRITE;
/*!40000 ALTER TABLE `yem_meat` DISABLE KEYS */;

INSERT INTO `yem_meat` (`id`, `name`, `description`, `price`, `picture`, `idType`)
VALUES
	(1,'Lapin à la moutarde','Lapin de Garennes aux 3 moutardes, délicieux oui oui !','53€','http://recettes-de-chefs.ca/images/archives/les_recettes_frederic_cyr/main/00_bs_epaule_lapiin-large.jpg',2),
	(2,'Poulet au Curry','Curry directement en provenance de Rungis et poulet cuit pendant 320 heures à 40 degrés.\nServi avec ses petit raisins sec très bon.','40€','http://www.delices-defrance.com/delicesmanager/images/redim/x258-mon-poulet-au-curry-34631.jpg',2),
	(3,'Tartiflette','Pommes de terre élevées à air libre pour des saveurs plus libérées','25€','http://chefpatate.fr/wp-content/uploads/2011/07/Tartiflette-traditionnelle-300x200.jpg',2),
	(4,'Ratatouille','Vous avez vu le film ?','36€','http://images.cuisineaz.com/bandeaux-recherche/2011/ratatouille.jpg',2),
	(5,'Crème Brulée','La crème de la crème','17€','http://icu.linter.fr/270/320717/1376409196/creme-brulee.jpg',2),
	(6,'Confit de Canard','Goutez à la générosité du Sud-Ouest','60€','http://www.lacanarderie.fr/libs/jpg/recette_confit_de_canard_aux_raisins(1).jpg',2);

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
  CONSTRAINT `yem_meat_gives_feeling_ibfk_1` FOREIGN KEY (`idMeat`) REFERENCES `yem_meat` (`id`),
  CONSTRAINT `yem_meat_gives_feeling_ibfk_2` FOREIGN KEY (`idFeeling`) REFERENCES `yem_feeling` (`id`)
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
	(6,5),
	(2,6),
	(5,6),
	(6,6),
	(3,9),
	(5,9),
	(6,9),
	(1,11),
	(4,12);

/*!40000 ALTER TABLE `yem_meat_gives_feeling` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_meat_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_meat_type`;

CREATE TABLE `yem_meat_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_meat_type` WRITE;
/*!40000 ALTER TABLE `yem_meat_type` DISABLE KEYS */;

INSERT INTO `yem_meat_type` (`id`, `name`)
VALUES
	(1,'Starter'),
	(2,'Main plate'),
	(3,'Dessert');

/*!40000 ALTER TABLE `yem_meat_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table yem_question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `yem_question`;

CREATE TABLE `yem_question` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `keywords` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_question` WRITE;
/*!40000 ALTER TABLE `yem_question` DISABLE KEYS */;

INSERT INTO `yem_question` (`id`, `content`, `keywords`)
VALUES
	(1,X'4FC3B920766F75647269657A2D766F75732070617274697220656E20766163616E63657320656E206365206D6F6D656E74203F','vacances,monde,destination,lieu'),
	(2,X'5175656C2065737420766F74726520C3A96CC3A96D656E74203F',NULL),
	(4,X'5175656C6C652065737420766F7472652074657874757265207072C3A966C3A972C3A965203F',NULL);

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
	(7,'Dans la lune'),
	(8,'Sensuel');

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
  CONSTRAINT `yem_state_leads_to_question_ibfk_1` FOREIGN KEY (`idState`) REFERENCES `yem_state` (`id`),
  CONSTRAINT `yem_state_leads_to_question_ibfk_2` FOREIGN KEY (`idQuestion`) REFERENCES `yem_question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_state_leads_to_question` WRITE;
/*!40000 ALTER TABLE `yem_state_leads_to_question` DISABLE KEYS */;

INSERT INTO `yem_state_leads_to_question` (`idState`, `idQuestion`)
VALUES
	(1,1),
	(3,1),
	(5,1),
	(6,1),
	(7,1),
	(4,2),
	(8,2),
	(2,4);

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
  CONSTRAINT `yem_state_needs_feeling_ibfk_1` FOREIGN KEY (`idState`) REFERENCES `yem_state` (`id`),
  CONSTRAINT `yem_state_needs_feeling_ibfk_2` FOREIGN KEY (`idFeeling`) REFERENCES `yem_feeling` (`id`)
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
  `name` text CHARACTER SET utf8 COLLATE utf8_bin,
  `idGroup` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idGroup` (`idGroup`),
  CONSTRAINT `yem_user_ibfk_1` FOREIGN KEY (`idGroup`) REFERENCES `yem_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `yem_user` WRITE;
/*!40000 ALTER TABLE `yem_user` DISABLE KEYS */;

INSERT INTO `yem_user` (`id`, `name`, `idGroup`)
VALUES
	(1,X'4672616EC3A76F6973',1),
	(2,X'4A65616E2D4368726973746F706865',1),
	(3,X'4972C3A86E65',1),
	(4,X'42756E6F',NULL),
	(13,X'6E69676874',NULL),
	(14,X'74657374',NULL),
	(15,X'74657374',NULL),
	(16,X'6A65616E20706965727265',NULL),
	(17,X'6A65616E206D696368656C',NULL),
	(18,X'616C76696E65',NULL),
	(19,X'6A2761692066696E69',NULL),
	(20,X'6368726973746F70686572',NULL),
	(21,X'72657374617572616E74206D65',NULL),
	(22,X'7068696C69707065',NULL),
	(23,X'74657374',NULL),
	(24,X'74657374',NULL),
	(29,X'6972C3A86E65',NULL),
	(30,X'43616D70696E67206C6520636F6D7465',NULL),
	(31,X'53616D73696E6720696E20746865206C6567656E64',NULL),
	(32,X'506F6E657920C3A9636F7373616973',NULL),
	(33,X'556E20706574697420636166C3A9',NULL),
	(34,X'556E20706F6E6579207175652073616974',NULL),
	(35,X'556E20706F6E657920636F7373616973',NULL),
	(36,X'556E20706F6E6579206C652073616973',NULL),
	(37,X'556E20706F6E657920C3A9636F7373616973',NULL),
	(38,X'4A62',NULL),
	(39,X'4A6D',NULL),
	(40,X'50746472',NULL),
	(41,X'5870746472',NULL),
	(42,X'54657374',NULL),
	(43,X'54657374',NULL),
	(44,X'54657374',NULL),
	(45,X'436C6F736572206A6F73C3A9',NULL),
	(46,X'4C6F736572',NULL),
	(47,X'3230',NULL),
	(48,X'426F7373',NULL),
	(49,X'4D6F62696C69736572',NULL),
	(50,X'4A65616E206D696368656C',NULL),
	(51,X'54657374206C6F6C',NULL),
	(52,X'54657374206D6963726F',NULL),
	(53,X'4573736169',NULL),
	(54,X'4A65616E206261707469737465',NULL),
	(55,X'4F756920656E2063617272C3A9',NULL),
	(56,X'4F7569206F6E2064C3A9636C61726572',NULL),
	(57,X'4A65616E206261707469737465',NULL),
	(58,X'4A652070657578207061726C6572',NULL),
	(59,X'43616D70696E6720636F747461676520647520636F7573636F757373696572206D69636861656C206A61636B736F6E20616E6EC3A96520706F7572206A6F7565722061752063686F636F6C6174206669617420667265656D6F6E74',NULL),
	(60,X'4972C3A86E65',NULL),
	(61,X'536972C3A86E65206465206C61206672657373616E6765',NULL),
	(62,X'48C3A96CC3A86E65206465206C61206672657373616E6765',NULL),
	(63,X'5475207061726C6573206469616E65',NULL),
	(64,X'426F6E6A6F7572',NULL),
	(65,X'4A6F686E',NULL),
	(66,X'5461626C65',NULL),
	(67,X'',NULL),
	(68,X'416C6C6F',NULL),
	(69,X'54657374206C6F6C',NULL),
	(70,X'4A65616E206368726973746F706865',NULL),
	(71,X'4A65616E206368726973746F706865',NULL),
	(72,X'4A65616E206261707469737465',NULL),
	(73,X'4A65616E206368726973746F706865',NULL),
	(74,X'4A65616E206261707469737465',NULL),
	(75,X'4A62',NULL),
	(76,X'426C6F67',NULL),
	(77,X'4A42',NULL),
	(78,X'4A42',NULL),
	(79,X'4A42',NULL),
	(80,X'3036',NULL),
	(81,X'4A62',NULL),
	(82,X'4A65616E206261707469737465',NULL),
	(83,X'4A65616E206368726973746F706865',NULL),
	(84,X'4A65616E206368726973746F706865',NULL),
	(85,X'4A65616E206261707469737465',NULL),
	(86,X'4A65616E207061756C',NULL),
	(87,X'4A65616E207068696C69707065',NULL),
	(88,X'41726E617564',NULL),
	(89,X'436F6E7374616E636520636F6E7374616E6365',NULL),
	(90,X'416E6E652063C3A963696C65',NULL),
	(91,X'416761746865',NULL),
	(92,X'416C696365',NULL),
	(93,X'54616E677579',NULL),
	(94,X'5374657068616E6965',NULL),
	(95,X'4E6F6C77656E6E',NULL),
	(96,X'4D6178616E6365',NULL),
	(97,X'46616269616E',NULL),
	(98,X'4C796F6E',NULL),
	(99,X'5261706861C3AB6C',NULL),
	(100,X'5261706861C3AB6C206C6F74',NULL),
	(101,X'4920742073',NULL),
	(102,X'4F6C69766961',NULL),
	(103,X'466C6F72656E74696E',NULL),
	(104,X'4368726973746F706865',NULL),
	(105,X'47656F72676573',NULL),
	(106,X'457469656E6E65',NULL),
	(107,X'47656E65736973',NULL),
	(108,X'416E6973',NULL),
	(109,X'4D6172717565',NULL),
	(110,X'566963746F72',NULL),
	(111,X'566963746F697265',NULL),
	(112,X'426F6E6A6F7572',NULL),
	(113,X'5761746920686F757365',NULL),
	(114,X'4769766F7273',NULL),
	(115,X'4A65616E206261707469737465',NULL),
	(116,X'52656E6E6573',NULL),
	(117,X'4A65206D6520646973',NULL),
	(118,X'4A65616E206D696368656C',NULL),
	(119,X'4A65616E206261707469737465206A65616E206261707469737465',NULL),
	(120,X'45726963',NULL),
	(121,X'4672C3A964C3A97269717565',NULL),
	(122,X'47656F72676573',NULL),
	(123,X'4A65616E2D6261707469737465',NULL),
	(124,X'47656F72676573',NULL),
	(125,X'46726564',NULL),
	(126,X'4A65616E206261707469737465',NULL),
	(127,X'4C61206A762076656C696E',NULL),
	(128,X'4A65616E206261707469737465',NULL),
	(129,X'4A65616E206261707469737465',NULL),
	(130,X'4A62206A62',NULL),
	(131,X'436F6E7374616E6365',NULL),
	(132,X'4D616E64617420666F6E6374696F6E6E656D656E742064652072656E636F6E747265',NULL),
	(133,X'426F6E6A6F7572',NULL),
	(134,X'4A65616E206368726973746F706865',NULL),
	(135,X'4469616E65',NULL),
	(136,X'436C6F766973',NULL),
	(137,X'56657263696E67C3A9746F726978',NULL),
	(138,X'4A65616E206261707469737465',NULL),
	(139,X'4A65616E206261707469737465',NULL),
	(140,X'53616D656469',NULL),
	(141,X'4775696C6C61756D65',NULL),
	(142,X'4DC3AA6D65207061732070657572',NULL),
	(143,X'4775696C6C61756D65',NULL),
	(144,X'4775696C6C61756D65206C657320616E6EC3A965732066616365626F6F6B',NULL),
	(145,X'4A65616E206261707469737465',NULL);

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
	(1,2,72),
	(1,5,242),
	(1,6,244),
	(1,7,80),
	(2,2,241),
	(2,3,243),
	(3,2,244),
	(3,7,241),
	(4,2,235),
	(109,2,60),
	(109,3,58),
	(109,5,58),
	(109,8,59),
	(110,1,57),
	(110,3,56),
	(110,5,56),
	(110,7,57),
	(111,2,55),
	(111,5,54),
	(112,4,53),
	(112,5,53),
	(113,1,50),
	(113,3,49),
	(113,5,49),
	(113,7,50),
	(114,1,47),
	(114,2,48),
	(114,3,46),
	(114,5,46),
	(115,4,45),
	(115,5,45),
	(117,1,42),
	(117,7,42),
	(118,2,41),
	(119,1,40),
	(119,3,39),
	(119,5,39),
	(119,7,40),
	(120,4,38),
	(120,5,38),
	(120,6,37),
	(121,2,35),
	(121,4,36),
	(121,5,36),
	(122,2,34),
	(122,3,32),
	(122,8,33),
	(123,2,30),
	(123,4,31),
	(123,5,31),
	(124,2,29),
	(124,3,27),
	(124,8,28),
	(125,2,26),
	(125,5,25),
	(125,7,24),
	(127,2,23),
	(129,2,22),
	(129,3,20),
	(129,5,20),
	(130,2,19),
	(130,8,18),
	(131,4,17),
	(131,5,17),
	(131,6,16),
	(132,1,14),
	(132,2,15),
	(132,3,13),
	(135,2,12),
	(135,5,11),
	(135,7,10),
	(136,2,9),
	(137,1,8),
	(137,3,7),
	(137,7,8),
	(138,2,6),
	(138,6,4),
	(138,8,5),
	(139,4,3),
	(139,5,3),
	(139,6,2),
	(145,2,1);

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
  CONSTRAINT `yem_user_orders_meat_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `yem_user` (`id`),
  CONSTRAINT `yem_user_orders_meat_ibfk_2` FOREIGN KEY (`idMeat`) REFERENCES `yem_meat` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
