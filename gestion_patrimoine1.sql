-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 29 juin 2022 à 03:29
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_patrimoine1`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `pat_id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id`, `user_id`, `pat_id`, `parent_id`, `comment`, `username`, `created_at`, `updated_at`) VALUES
(1, 1, 2, NULL, 'Wahou, tres cool l\'application. J\'adore', 'tfytfg', '2022-06-29 00:16:58', '2022-06-29 00:16:58');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_05_07_171037_create_patrimoines_table', 1),
(6, '2022_05_17_003923_create_commentaires_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `patrimoines`
--

CREATE TABLE `patrimoines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(10000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `typepat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entreprise` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chefEquipe` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `plan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pays` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `echeance` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `validation` tinyint(1) NOT NULL DEFAULT 0,
  `idUser` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `patrimoines`
--

INSERT INTO `patrimoines` (`id`, `titre`, `description`, `typepat`, `entreprise`, `chefEquipe`, `image`, `plan`, `pays`, `ville`, `echeance`, `latitude`, `longitude`, `validation`, `idUser`, `created_at`, `updated_at`) VALUES
(2, 'Mémorial Thomas Sankara', 'Le mémorial Thomas Sankara est en passe de devenir le site le plus attractif de la capitale Burkinabè,Ouagadougou. Depuis l’ouverture du site au grand public le 1er juin 2020,les visites se multiplient.', 'Monument', 'Entreprise NANA', 'Mr NANA', 'Hg22C2Rp9WC8aKK4PjwAUvwcdPprr8rpa1anwdds.jpg', 'r2m6wjWORG6RQWm6AUS6FeTkL4EHvJtZp0wAi5OF.pdf', 'Burkina', 'Ouagadougou', '2021-01-04||2022-01-10', 12.376829347954285, -1.5082812309265137, 1, 1, '2022-06-28 23:56:09', '2022-06-29 00:12:27'),
(3, 'Mémorial aux Héros nationaux', 'l est constitué de deux calebasses, une retournée en bas, et une autre, en haut, contenant l’eau de l’entente et de la paix retrouvée. Les deux calebasses sont portées par quatre grandes structures qui représentent', 'Monument', 'Entreprise NANA', 'Mr NANA', 'KD32u0fVI9wqE82vfOqmgR0SMTsfNzGA1OaQBs1A.jpg', 'osRJy2ojiwOP1evkuVhglpxxKSNRTnWlMSwvOMKn.pdf', 'Burkina', 'Ouagadougou', '2021-01-04||2022-01-10', 12.312162916603542, -1.5027236938476562, 1, 1, '2022-06-29 00:04:40', '2022-06-29 00:12:53'),
(4, 'La vielle mosquée de Dioulassoba', 'Elle a été construite en 1890 par l’Almani Sidiki SANON. Les visites se font dans la matinée uniquement. Elle se situe au centre de la ville de Bobo-Dioulasso, en face du quartier Kibédoué et de l’Hôtel de Ville.', 'Monument', 'Entreprise NANA', 'Mr NANA', 'xC9OjwxVW9RSC8IhzXHWZG3ivuEnqaUtjQ1hPtZZ.jpg', 'WzPT2O7hcqQ9zRfUTckZJKidikOx1urp5ljzUp2L.pdf', 'Burkina', 'Ouagadougou', '2021-01-04||2022-01-10', 11.631948749707407, -2.1783004111257553, 1, 1, '2022-06-29 00:09:26', '2022-06-29 00:13:08'),
(5, 'Monument des martyrs', 'Cette œuvre monumentale se compose d’éléments symboliques sur le multiple plan sociologique, religieux, spirituel etc…. régissant le genre humain et la société :\r\nLa calebasse brisée : En eﬀet,', 'Monument', 'Entreprise NANA', 'Nana Abdoul', 'iaf05Ivm3KKLRZluwslAQfMw0VvZ9VjmfJfNWc7w.jpg', 'bxPZabLvzpxwlLFiomORsD33rTRyjegqC8dUqH86.pdf', 'Burkina', 'Ouagadougou', '2022-06-05 au 2022-06-25', 12.378666603977459, -1.503582235226646, 0, 1, '2022-06-29 01:03:54', '2022-06-29 01:03:54'),
(6, 'Tampouy Échangeur Du Nord', 'D’un coût global de 70 milliards de F CFA, l’échangeur du Nord a été inauguré le 15 novembre 2018. Exécuté en trois ans, l’édifice vient désengorger la circulation au grand bonheur de la population mais fait polémique notamment sur sa paternité.', 'Route', 'Ebomaf', 'Bonkougou Mohamed', 'EGqtSINhq7ZWFt7sdsCSPJvWjQCLST7xYJRNhjsI.jpg', 'DFRwujXDRlMyoJDLXeovrvlyPHOpFJRyzVV4z5e7.pdf', 'Burkina', 'Ouagadougou', '2022-06-01 au 2022-06-21', 12.384856512028602, -1.5549087524414062, 1, 1, '2022-06-29 01:12:24', '2022-06-29 01:14:30');

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `profession` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `email_verified_at`, `profession`, `numero`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'fayt', 'tfytfg', 'faycalnana1@gmail.com', NULL, 'Entrepreneur', '5652526565', '1212', NULL, '2022-06-23 12:30:23', '2022-06-23 12:30:23'),
(2, 'Toe', 'Cesxaiere', 'faycalnana2@gmail.com', NULL, 'Entrepreneur', '61332481', '1234', NULL, '2022-06-23 12:37:27', '2022-06-23 12:37:27');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentaires_parent_id_index` (`parent_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Index pour la table `patrimoines`
--
ALTER TABLE `patrimoines`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `patrimoines`
--
ALTER TABLE `patrimoines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
