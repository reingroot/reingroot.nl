<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_portfolio_content extends CI_Migration {

	public function up()
	{
		$query = $this->db->query("
		-- phpMyAdmin SQL Dump
		-- version 3.2.5
		-- http://www.phpmyadmin.net
		--
		-- Host: localhost
		-- Generation Time: Mar 22, 2013 at 09:45 AM
		-- Server version: 5.1.44
		-- PHP Version: 5.3.2

		SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO';

		--
		-- Database: `reingroot`
		--

		-- --------------------------------------------------------

		--
		-- Table structure for table `images`
		--

		CREATE TABLE `images` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `image_url` text NOT NULL,
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

		--
		-- Dumping data for table `images`
		--

		INSERT INTO `images` VALUES(1, 'fred_1.png');
		INSERT INTO `images` VALUES(2, 'fred_2.png');

		-- --------------------------------------------------------

		--
		-- Table structure for table `portfolio_items`
		--

		CREATE TABLE `portfolio_items` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `slug` text NOT NULL,
		  `preview_title` text NOT NULL,
		  `title` text NOT NULL,
		  `text` text NOT NULL,
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

		--
		-- Dumping data for table `portfolio_items`
		--

		INSERT INTO `portfolio_items` VALUES(4, 'sol-utd', 'SOL utd', 'SOL utd (social start-up)', '');
		INSERT INTO `portfolio_items` VALUES(5, 'elsevier-science', 'Elsevier Science', 'Elsevier Science', '');
		INSERT INTO `portfolio_items` VALUES(6, 'nu-open-state', 'Open State', 'Nu.nl and Open State Foundation', '');
		INSERT INTO `portfolio_items` VALUES(7, 'skylines', 'Skylines', 'Skylin.es (mobile start-up)', '');
		INSERT INTO `portfolio_items` VALUES(8, 'lazzo', 'Lazzo', 'Lazzo.nl', '');
		INSERT INTO `portfolio_items` VALUES(3, 'tweede-kamer', 'Tweede Kamer', 'Tweede Kamer der Staten-Generaal (Dutch House of Representatives)', '');

		-- --------------------------------------------------------

		--
		-- Table structure for table `portfolio_items_images`
		--

		CREATE TABLE `portfolio_items_images` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `portfolio_item_id` int(11) NOT NULL,
		  `image_id` int(11) NOT NULL,
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

		--
		-- Dumping data for table `portfolio_items_images`
		--

		INSERT INTO `portfolio_items_images` VALUES(1, 1, 1);
		INSERT INTO `portfolio_items_images` VALUES(2, 2, 1);
		INSERT INTO `portfolio_items_images` VALUES(3, 1, 2);

		-- --------------------------------------------------------

		--
		-- Table structure for table `portfolio_items_services_used`
		--

		CREATE TABLE `portfolio_items_services_used` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `portfolio_item_id` int(11) NOT NULL,
		  `service_used_id` int(11) NOT NULL,
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

		--
		-- Dumping data for table `portfolio_items_services_used`
		--

		INSERT INTO `portfolio_items_services_used` VALUES(1, 4, 1);
		INSERT INTO `portfolio_items_services_used` VALUES(2, 4, 2);
		INSERT INTO `portfolio_items_services_used` VALUES(3, 5, 1);
		INSERT INTO `portfolio_items_services_used` VALUES(4, 5, 2);
		INSERT INTO `portfolio_items_services_used` VALUES(5, 6, 1);
		INSERT INTO `portfolio_items_services_used` VALUES(6, 6, 2);
		INSERT INTO `portfolio_items_services_used` VALUES(7, 6, 3);
		INSERT INTO `portfolio_items_services_used` VALUES(8, 7, 1);
		INSERT INTO `portfolio_items_services_used` VALUES(9, 8, 1);
		INSERT INTO `portfolio_items_services_used` VALUES(10, 8, 2);
		INSERT INTO `portfolio_items_services_used` VALUES(11, 8, 3);
		INSERT INTO `portfolio_items_services_used` VALUES(12, 3, 1);
		INSERT INTO `portfolio_items_services_used` VALUES(13, 3, 2);

		-- --------------------------------------------------------

		--
		-- Table structure for table `services_used`
		--

		CREATE TABLE `services_used` (
		  `id` int(11) NOT NULL AUTO_INCREMENT,
		  `service_used` text NOT NULL,
		  PRIMARY KEY (`id`)
		) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

		--
		-- Dumping data for table `services_used`
		--

		INSERT INTO `services_used` VALUES(1, 'Strategy');
		INSERT INTO `services_used` VALUES(2, 'Development');
		INSERT INTO `services_used` VALUES(3, 'Delivery');
		");
	}

	public function down()
	{
		$this->dbforge->drop_table(array('images', 'portfolio_items', 'portfolio_items_images', 'portfolio_items_services_used', 'services_used'));
	}
}