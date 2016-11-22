-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.5.48 - MySQL Community Server (GPL)
-- ОС Сервера:                   Win32
-- HeidiSQL Версия:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры для таблица innakhx4_gantt.gantt_links
CREATE TABLE IF NOT EXISTS `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы innakhx4_gantt.gantt_links: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `gantt_links` DISABLE KEYS */;
INSERT INTO `gantt_links` (`id`, `source`, `target`, `type`) VALUES
	(1, 34, 35, '1'),
	(2, 49, 51, '1'),
	(3, 49, 52, '1');
/*!40000 ALTER TABLE `gantt_links` ENABLE KEYS */;


-- Дамп структуры для таблица innakhx4_gantt.gantt_tasks
CREATE TABLE IF NOT EXISTS `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) COLLATE utf8_bin NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `deadline` datetime DEFAULT NULL,
  `type` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT 'task',
  `resource_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `resource_amount` float NOT NULL,
  `hours` float NOT NULL,
  `manhours` float NOT NULL,
  `mancount` float NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `progress` float NOT NULL,
  `sortorder` double NOT NULL DEFAULT '0',
  `priority` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Дамп данных таблицы innakhx4_gantt.gantt_tasks: ~16 rows (приблизительно)
/*!40000 ALTER TABLE `gantt_tasks` DISABLE KEYS */;
INSERT INTO `gantt_tasks` (`id`, `text`, `start_date`, `duration`, `parent`, `project_id`, `deadline`, `type`, `resource_type`, `resource_amount`, `hours`, `manhours`, `mancount`, `description`, `progress`, `sortorder`, `priority`) VALUES
	(34, 'Задача1', '2015-11-15 00:00:00', 1, 0, 1, '1900-11-30 00:00:00', 'task', '0', 0, 0, 2.5, 0, 'Вер. 1.0', 0, 3, 0),
	(35, 'Задача2', '2015-11-12 00:00:00', 73, 34, 1, '1900-11-30 00:00:00', 'task', '0', 1, 0, 0, 0, 'Закрывать дропдаун по клику в любом месте \n', 0, -5, 0),
	(36, 'Задача3', '2015-11-12 00:00:00', 1, 34, 1, '2015-11-13 00:00:00', 'task', '0', 1, 0, 0, 0, 'Время начала - по умолч. Завтра', 0, -9, 0),
	(37, 'Задача4', '2015-11-12 00:00:00', 55, 34, 1, '2015-11-30 00:00:00', 'resource', 'Оборудование', 1, 0, 0, 0, 'На форме задачи убрать поле User add и сделать ', 0, -12, 0),
	(40, 'Задача5', '2015-11-12 00:00:00', 10, 34, 1, '0000-00-00 00:00:00', 'task', '0', 0, 0, 0, 0, 'На форме задачи добавить bootstrap grid “Ресурсы”\n', 0, -16, 0),
	(42, 'Задача6', '2015-11-14 00:00:00', 109, 0, 2, '0000-00-00 00:00:00', 'task', '0', 0.814476, 0, 0, 0, '', 0, 1, 0),
	(49, 'Задача7', '2015-11-18 00:00:00', 11, 0, 2, '0000-00-00 00:00:00', 'resource', 'Материал', 0, 0, 0, 0, 'Сделать подменю: Создать подзадачу, Удалить', 0, -3, 0),
	(51, 'Задача8', '2015-11-18 00:00:00', 1, 34, 2, NULL, 'task', '0', 1, 0, 0, 0, 'Меню для "основного грида"', 0, -7, 0),
	(52, 'Задача9', '2015-11-18 00:00:00', 1, 34, 3, '0000-00-00 00:00:00', 'task', '0', 1, 0, 0, 0, 'Добавить поле Комментарий под Description', 0, -8, 0),
	(54, 'Задача10', '2015-11-18 00:00:00', 1, 34, 3, '0000-00-00 00:00:00', 'task', '0', 1, 0, 0, 0, 'Время - в ЧЧ:ММ', 0, -11, 0),
	(55, 'Задача11', '2015-11-18 00:00:00', 1, 34, 4, NULL, 'task', '0', 1, 0, 0, 0, 'Добавить поля Дата начала, Дата завершения', 0, -10, 0),
	(56, 'Задача12', '2015-11-17 16:00:00', 29, 34, 5, '0000-00-00 00:00:00', 'task', '0', 1, 0, 0, 0, 'Приоритет задачи', 0, -16, 0),
	(57, 'Задача13', '2015-11-18 00:00:00', 10, 34, 5, '0000-00-00 00:00:00', 'task', '0', 1, 0, 0, 0, 'Не сохраняет порядок сортировки при перетаскивании', 0, -15, 0),
	(58, 'Задача14', '2015-11-18 00:00:00', 73, 0, 5, '0000-00-00 00:00:00', 'task', '0', 0, 0, 0, 0, 'Багиss', 0, -2, 0),
	(59, 'Задача15', '2015-11-18 00:00:00', 46, 34, 5, '0000-00-00 00:00:00', 'task', '0', 0.381395, 0, 0, 0, 'Добавить над гридом дропдаун "Проекты" - переключение проектов', 0, -14, 0),
	(270, 'Задача16', '2015-11-11 00:00:00', 1, 0, 5, NULL, 'task', '0', 0, 0, 0, 0, '', 0, 0, 0);
/*!40000 ALTER TABLE `gantt_tasks` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
