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
-- Структура таблицы `resources2`
--
-- Создание: Ноя 26 2016 г., 16:55
-- Последнее обновление: Ноя 27 2016 г., 09:03
--

DROP TABLE IF EXISTS `resources2`;
CREATE TABLE `resources2` (
  `id` int(11) NOT NULL,
  `order_ind` int(11) NOT NULL,
  `idh_code` varchar(10) DEFAULT NULL,
  `autocalc` varchar(2) NOT NULL,
  `name` varchar(100) NOT NULL,
  `ed_izm` varchar(20) NOT NULL,
  `mat_usage` float NOT NULL,
  `length` float NOT NULL,
  `r_norma` decimal(10,2) NOT NULL,
  `amount_in_pack` float NOT NULL DEFAULT '1',
  `purchase_price` decimal(10,2) NOT NULL DEFAULT '1.00',
  `package_count` float NOT NULL DEFAULT '0',
  `price_edizm` decimal(10,2) NOT NULL,
  `price_grn` decimal(10,2) NOT NULL,
  `nomencl_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `active` varchar(10) NOT NULL DEFAULT 'вкл',
  `koef` float NOT NULL COMMENT 'коэфициент для подстановки в формулы',
  `formula` varchar(1000) NOT NULL,
  `attr` mediumtext NOT NULL,
  `weight` float NOT NULL,
  `plan_id` int(11) NOT NULL,
  `ved_count` decimal(20,0) NOT NULL,
  `smeta_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL DEFAULT '0',
  `vendor_code` varchar(50) NOT NULL,
  `start_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `duration` int(11) NOT NULL DEFAULT '0',
  `parent` int(11) NOT NULL DEFAULT '0',
  `deadline` datetime DEFAULT NULL,
  `type` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'resource',
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
-- Дамп данных таблицы `resources2`
--

INSERT INTO `resources2` (`id`, `order_ind`, `idh_code`, `autocalc`, `name`, `ed_izm`, `mat_usage`, `length`, `r_norma`, `amount_in_pack`, `purchase_price`, `package_count`, `price_edizm`, `price_grn`, `nomencl_id`, `user_id`, `active`, `koef`, `formula`, `attr`, `weight`, `plan_id`, `ved_count`, `smeta_id`, `project_id`, `vendor_code`, `start_date`, `duration`, `parent`, `deadline`, `type`, `resource_type`, `resource_amount`, `hours`, `manhours`, `mancount`, `description`, `progress`, `sortorder`) VALUES
(1073741825, 0, '947524', '7', 'Шпаклевка минеральная стартовая Ceresit CT 29', 'кг', 3.6, 0, '115.70', 25, '0.00', 16.6608, '0.00', '132.68', 2, 1, 'вкл', 1, 'heightUnderGround', '', 0, 0, '0', 0, 0, 'СТ 29', '2016-11-26 20:31:20', 0, 0, NULL, 'resource', '', 0, 8, 0, 1, '', 0, 0),
(1073741826, 0, '1314269', '7', 'Акриловая шпаклевка для внутренних работ Ceresit СТ95 (0,07) ', 'кг', 0, 0, '115.70', 8.5, '0.00', 0, '0.00', '277.84', 2, 1, 'вкл', 1, '', '', 0, 0, '0', 0, 0, 'CT 95 (0 07мм)', '2016-11-26 20:31:20', 0, 0, NULL, 'resource', '', 0, 8, 0, 1, '', 0, 0),
(1073741827, 7930, '', '17', 'Кирпич', 'шт', 1.5, 0, '115.70', 1, '0.00', 173.55, '12.00', '0.00', 3, 1, 'вкл', 0, '', '{"wgrid":{"setting":{"mortarweight":0.005,"lenstep":0.255,"heightstep":0.07,"weightstep":0.12,"tlen":2,"theight":2,"length_var":"len","height_var":"height"}}}', 0, 0, '0', 0, 0, '', '2016-11-26 20:31:29', 0, 0, NULL, 'resource', '', 0, 8, 0, 1, '', 0, 0),
(1073741828, 5795, '', '17', 'Кирпичи', 'шт', 1, 0, '123.00', 1, '0.00', 123, '22.00', '0.00', 4, 1, 'вкл', 0, '', '{"wgrid":{"setting":{"mortarweight":0,"lenstep":0.401,"heightstep":0.174,"weightstep":0,"tlen":2,"theight":2,"length_var":"len","height_var":"height"}}}', 0, 0, '0', 28, 71, '', '2016-11-27 12:03:32', 0, 0, NULL, 'resource', '', 0, 8, 0, 1, '', 0, 0),
(1073741829, 7930, '', '17', 'Кирпич', 'шт', 1.5, 0, '80.60', 1, '0.00', 120.9, '12.00', '0.00', 5, 1, 'вкл', 0, '', '{"wgrid":{"setting":{"mortarweight":0.005,"lenstep":0.255,"heightstep":0.07,"weightstep":0.12,"tlen":2,"theight":2,"length_var":"len","height_var":"height"}}}', 0, 0, '0', 28, 71, '', '2016-11-27 12:03:35', 0, 0, NULL, 'resource', '', 0, 8, 0, 1, '', 0, 0),
(1073741830, 2721, '', '17', 'Кирпич', 'шт', 1, 0, '0.00', 1, '1.00', 0, '0.00', '2.00', 6, 1, 'вкл', 1, 'work_volume+5', '{"l1":{"value":"12.000","collection":""},"wgrid":{"setting":{"lenstep":"0.26","heightstep":"0.08","tlen":2,"theight":2,"length_var":"len","height_var":"height"}}}', 0, 0, '0', 28, 71, '', '2016-11-27 12:03:38', 0, 0, NULL, 'resource', '', 0, 8, 0, 1, '', 0, 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `resources2`
--
ALTER TABLE `resources2`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `smeta_id` (`smeta_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `resources2`
--
ALTER TABLE `resources2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1073741831;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
