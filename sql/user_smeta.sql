-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Ноя 27 2016 г., 12:10
-- Версия сервера: 5.7.14-8-beget-log
-- Версия PHP: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `esoftdsc_smeta`
--

-- --------------------------------------------------------

--
-- Структура таблицы `user_smeta`
--
-- Создание: Ноя 26 2016 г., 16:24
-- Последнее обновление: Ноя 27 2016 г., 09:03
--

DROP TABLE IF EXISTS `user_smeta`;
CREATE TABLE `user_smeta` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(250) NOT NULL,
  `ed_izm` varchar(50) NOT NULL,
  `poverhnost` varchar(10000) DEFAULT NULL,
  `price_grn` decimal(10,2) NOT NULL,
  `price_dlr` decimal(10,2) NOT NULL,
  `count` decimal(15,4) NOT NULL,
  `zp` decimal(10,1) NOT NULL DEFAULT '0.0',
  `sort_order` int(11) NOT NULL,
  `checked` tinyint(4) NOT NULL DEFAULT '1',
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `rec_type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1 - работа, 2 - ресурс',
  `smeta_id` int(11) NOT NULL DEFAULT '0',
  `workload` decimal(10,2) NOT NULL,
  `shifr` varchar(50) NOT NULL,
  `project_id` int(11) NOT NULL DEFAULT '0',
  `pdfs` varchar(300) NOT NULL,
  `start_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `duration` int(11) NOT NULL DEFAULT '0',
  `parent` int(11) NOT NULL DEFAULT '0',
  `deadline` datetime DEFAULT NULL,
  `type` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'task',
  `resource_type` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `resource_amount` float NOT NULL,
  `hours` float NOT NULL DEFAULT '8',
  `manhours` float NOT NULL,
  `mancount` float NOT NULL DEFAULT '1',
  `description` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `progress` float NOT NULL,
  `sortorder` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_smeta`
--

INSERT INTO `user_smeta` (`id`, `parent_id`, `name`, `ed_izm`, `poverhnost`, `price_grn`, `price_dlr`, `count`, `zp`, `sort_order`, `checked`, `user_id`, `plan_id`, `rec_type`, `smeta_id`, `workload`, `shifr`, `project_id`, `pdfs`, `start_date`, `duration`, `parent`, `deadline`, `type`, `resource_type`, `resource_amount`, `hours`, `manhours`, `mancount`, `description`, `progress`, `sortorder`) VALUES
(2, NULL, 'Внутренняя отделка', 'м2', 'Площадь внутренних стен', '0.00', '0.00', '115.7000', '0.0', 1, 1, 1, 0, 1, 0, '0.00', '', 0, 'undefined', '2016-11-26 20:31:20', 0, 0, NULL, 'task', '', 0, 8, 0, 1, '', 0, 0),
(3, NULL, 'Кирпичная стена', 'м2', 'Сетка', '0.00', '0.00', '115.7000', '0.0', 2, 1, 1, 0, 1, 0, '0.00', '', 0, 'undefined', '2016-11-26 20:31:29', 0, 0, NULL, 'task', '', 0, 8, 0, 1, '', 0, 0),
(4, NULL, 'Кирпичная кладка', 'шт', 'Помещение 1_2;', '12.00', '0.00', '0.0000', '0.0', 1, 1, 1, 0, 1, 28, '0.00', '', 71, 'undefined', '2016-11-27 12:03:32', 0, 0, NULL, 'task', '', 0, 8, 0, 1, '', 0, 0),
(5, NULL, 'Кирпичная стена', 'м2', 'Помещение 1_2;', '0.00', '0.00', '80.6000', '0.0', 2, 1, 1, 0, 1, 28, '0.00', '', 71, 'undefined', '2016-11-27 12:03:35', 0, 0, NULL, 'task', '', 0, 8, 0, 1, '', 0, 0),
(6, NULL, 'Коробка здания', 'м', 'Помещение 1_2;', '33.00', '0.00', '39.3000', '0.0', 3, 1, 1, 0, 1, 28, '0.00', '', 71, 'undefined', '2016-11-27 12:03:38', 0, 0, NULL, 'task', '', 0, 8, 0, 1, '', 0, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `user_smeta`
--
ALTER TABLE `user_smeta`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `smeta` (`smeta_id`),
  ADD KEY `smeta_id` (`smeta_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `user_smeta`
--
ALTER TABLE `user_smeta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
