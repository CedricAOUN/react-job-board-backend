-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: jobbyjob_db
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidates`
--
use jobbyjob_db

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `job_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`job_id`),
  UNIQUE KEY `user_id_2` (`user_id`,`job_id`),
  KEY `user_link_idx` (`user_id`),
  KEY `job_link_idx` (`job_id`),
  CONSTRAINT `job_link` FOREIGN KEY (`job_id`) REFERENCES `job` (`idjob`) ON DELETE CASCADE,
  CONSTRAINT `user_link` FOREIGN KEY (`user_id`) REFERENCES `user` (`iduser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (1,1,1),(5,1,2),(25,1,3),(26,1,4),(14,1,5),(28,1,6),(29,1,7),(30,1,8),(15,1,9),(32,1,10),(33,1,11),(34,1,12),(35,1,13),(16,1,14),(39,1,17),(38,1,18),(2,2,1),(44,83,1),(46,83,2);
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_url` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `files_ibfk_1` (`user_id`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`iduser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (3,1,'testPDF.pdf','./uploads/1'),(4,2,'dummy1.pdf','./uploads/2'),(8,76,'dummy1.pdf','./uploads/76'),(9,83,'testPDF.pdf','./uploads/83');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `idjob` int NOT NULL AUTO_INCREMENT,
  `idemployer` int NOT NULL,
  `posted_date` datetime DEFAULT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `requirements` varchar(1000) DEFAULT NULL,
  `salary` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idjob`),
  UNIQUE KEY `idjob_UNIQUE` (`idjob`),
  KEY `idemployer_idx` (`idemployer`),
  CONSTRAINT `idemployer` FOREIGN KEY (`idemployer`) REFERENCES `user` (`iduser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,1,'2023-06-01 00:00:00','ABC Tech is seeking a skilled software engineer to join our team. Responsibilities include developing and maintaining software applications, troubleshooting issues, and collaborating with cross-functional teams.','ABC Tech','Software Engineer','San Francisco, CA','Bachelor\'s degree in Computer Science, proficiency in programming languages such as Java or Python, experience with web development frameworks','$100,000 - $120,000'),(2,1,'2023-06-02 00:00:00','XYZ Inc. is looking for a Marketing Manager to lead our marketing campaigns. Responsibilities include developing marketing strategies, managing advertising campaigns, and analyzing market trends.','XYZ Inc.','Marketing Manager','New York, NY','Bachelor\'s degree in Marketing or related field, experience in marketing or advertising, strong analytical and communication skills','$80,000 - $100,000'),(3,1,'2023-06-03 00:00:00','City Hospital is hiring Registered Nurses to provide high-quality patient care. Responsibilities include administering medication, monitoring patients, and collaborating with healthcare teams.','City Hospital','Registered Nurse','Chicago, IL','Valid nursing license, Bachelor of Science in Nursing, strong attention to detail, ability to work in a fast-paced environment','$60,000 - $80,000'),(4,1,'2023-06-04 00:00:00','XYZ Web Solutions is seeking a talented Frontend Developer to join our team. Responsibilities include implementing user interfaces, optimizing website performance, and collaborating with backend developers.','XYZ Web Solutions','Frontend Developer','Seattle, WA','Proficiency in HTML, CSS, and JavaScript, experience with frontend frameworks like React or Angular, knowledge of responsive web design principles','$80,000 - $100,000'),(5,1,'2023-06-05 00:00:00','Data Analytics Inc. is looking for a skilled Data Scientist to analyze complex datasets and provide valuable insights. Responsibilities include data modeling, statistical analysis, and developing machine learning algorithms.','Data Analytics Inc.','Data Scientist','San Jose, CA','Strong knowledge of statistics and machine learning, proficiency in programming languages like Python or R, experience with data visualization tools','$100,000 - $120,000'),(6,1,'2023-06-06 00:00:00','Creative Studio is hiring a talented Graphic Designer to create visually stunning designs. Responsibilities include designing marketing materials, logos, and website layouts using industry-standard design software.','Creative Studio','Graphic Designer','Los Angeles, CA','Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign), strong portfolio showcasing design skills, understanding of design principles and typography','$60,000 - $80,000'),(7,1,'2023-06-07 00:00:00','Global Sales Corp is seeking a motivated Sales Representative to promote and sell our products. Responsibilities include identifying potential customers, presenting product features, and closing sales deals.','Global Sales Corp','Sales Representative','New York, NY','Excellent communication and negotiation skills, ability to build and maintain customer relationships, previous sales experience preferred','$50,000 - $70,000'),(8,1,'2023-06-08 00:00:00','Digital Innovations is looking for a talented UX/UI Designer to create intuitive user interfaces. Responsibilities include conducting user research, prototyping, and collaborating with cross-functional teams.','Digital Innovations','UX/UI Designer','Austin, TX','Experience with UX/UI design tools like Sketch or Figma, knowledge of user-centered design principles, strong problem-solving skills','$70,000 - $90,000'),(9,1,'2023-06-09 00:00:00','An Investment Bank is hiring a Financial Analyst to analyze financial data and provide insights. Responsibilities include financial modeling, forecasting, and preparing reports for management.','Investment Bank','Financial Analyst','Chicago, IL','Bachelor\'s degree in Finance or related field, strong analytical and mathematical skills, proficiency in financial analysis software','$70,000 - $90,000'),(10,1,'2023-06-10 00:00:00','Tech Innovators is seeking a skilled Product Manager to oversee product development. Responsibilities include defining product strategy, gathering requirements, and coordinating cross-functional teams.','Tech Innovators','Product Manager','San Francisco, CA','Strong understanding of product management principles, experience in software or tech industry, excellent communication and leadership skills','$90,000 - $110,000'),(11,1,'2023-06-11 00:00:00','PeopleFirst Corp is looking for a Human Resources Specialist to handle various HR tasks. Responsibilities include recruitment, employee onboarding, benefits administration, and policy implementation.','PeopleFirst Corp','Human Resources Specialist','Houston, TX','Bachelor\'s degree in Human Resources or related field, knowledge of HR laws and regulations, strong organizational and interpersonal skills','$60,000 - $80,000'),(12,1,'2023-06-12 00:00:00','Software Solutions Ltd. is hiring a Quality Assurance Engineer to ensure product quality. Responsibilities include creating and executing test plans, identifying and reporting bugs, and collaborating with development teams.','Software Solutions Ltd.','Quality Assurance Engineer','Boston, MA','Experience in software testing methodologies, knowledge of testing tools and frameworks, attention to detail','$70,000 - $90,000'),(13,1,'2023-06-13 00:00:00','IT Services Inc. is seeking a skilled Network Administrator to manage and maintain network infrastructure. Responsibilities include troubleshooting network issues, configuring routers and switches, and ensuring network security.','IT Services Inc.','Network Administrator','Denver, CO','Knowledge of network protocols and technologies, experience with network monitoring tools, strong problem-solving skills','$65,000 - $85,000'),(14,1,'2023-06-14 00:00:00','A Digital Marketing Agency is looking for a talented Content Writer to create engaging and SEO-friendly content. Responsibilities include writing blog posts, website copy, and social media content.','Digital Marketing Agency','Content Writer','Miami, FL','Excellent writing and editing skills, understanding of SEO best practices, ability to research and write on various topics','$40,000 - $60,000'),(15,1,'2023-06-15 00:00:00','Advanced Technology Solutions is hiring an Electrical Engineer to design and develop electrical systems. Responsibilities include circuit design, testing, and collaborating with multidisciplinary teams.','Advanced Technology Solutions','Electrical Engineer','Phoenix, AZ','Bachelor\'s degree in Electrical Engineering or related field, proficiency in electrical design software, knowledge of industry standards and regulations','$80,000 - $100,000'),(16,1,'2023-06-16 00:00:00','Logistics Solutions is seeking an Operations Manager to oversee daily operations. Responsibilities include process optimization, team management, and ensuring efficient logistics operations.','Logistics Solutions','Operations Manager','Dallas, TX','Experience in operations management, strong leadership and organizational skills, knowledge of supply chain management','$90,000 - $110,000'),(17,1,'2023-06-17 00:00:00','Infrastructure Engineering is hiring a Civil Engineer to design and oversee construction projects. Responsibilities include conducting site inspections, preparing engineering plans, and ensuring compliance with regulations.','Infrastructure Engineering','Civil Engineer','Atlanta, GA','Bachelor\'s degree in Civil Engineering or related field, proficiency in CAD software, knowledge of engineering principles and codes','$70,000 - $90,000'),(18,1,'2023-06-18 00:00:00','An IT Solutions Company is looking for a Technical Support Specialist to provide technical assistance to clients. Responsibilities include troubleshooting hardware and software issues, documenting support tickets, and providing timely resolutions.','IT Solutions Company','Technical Support Specialist','Seattle, WA','Strong knowledge of computer systems and networks, excellent customer service skills, ability to explain technical concepts to non-technical users','$50,000 - $70,000'),(19,1,'2023-06-19 00:00:00','A Financial Services Firm is seeking an Operations Analyst to analyze operational processes and improve efficiency. Responsibilities include data analysis, identifying bottlenecks, and implementing process improvements.','Financial Services Firm','Operations Analyst','New York, NY','Strong analytical and problem-solving skills, proficiency in data analysis tools like Excel or SQL, knowledge of financial operations','$60,000 - $80,000'),(20,1,'2023-06-20 00:00:00','AI Solutions Inc. is looking for an Artificial Intelligence Engineer to develop and deploy AI solutions. Responsibilities include data preprocessing, model training, and deploying machine learning models.','AI Solutions Inc.','Artificial Intelligence Engineer','San Francisco, CA','Proficiency in programming languages like Python or Java, experience with machine learning frameworks like TensorFlow or PyTorch, knowledge of AI algorithms','$100,000 - $120,000');
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `userType` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `iduser_UNIQUE` (`iduser`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','recruiter','admin@admin.com'),(2,'user','user','regular','user@user.com'),(76,'user2','user','regular','user2@user.com'),(78,'user3','user','regular','user3@user.com'),(83,'admin2','admin','recruiter','admin2@admin.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-26 17:54:38
