// lib/markdown.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ApiOpenDataSources from '../components/ApiOpenDataSources';

const methodsDirectory = path.join(process.cwd(), 'posts/methodes');
const usagesDirectory = path.join(process.cwd(), 'posts/usages');
const datasetsDirectory = path.join(process.cwd(), 'posts/datasets');

// Méthodes
export function getAllMethods() {
  const fileNames = fs.readdirSync(methodsDirectory);
  const allMethodsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(methodsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const tags = data.tags ? data.tags : []; // vérifier si tags existe
    const type = data.type ? data.type : null; // vérifier si type existe

    return {
      slug,
      content,
      title: data.title || '',
      image: data.image || null,
      description: data.description || '',
      datasets: data.datasets || null,
      usages: data.usages || null,
      tags,
      type,
    };
  });

  return allMethodsData;
}

export function getMethodBySlug(slug) {
  const fullPath = path.join(methodsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Remplacer les valeurs `undefined` par `null` ou des chaînes vides
  const sanitizedData = {};
  for (const key in data) {
    sanitizedData[key] = data[key] === undefined ? null : data[key];
  }

  return {
    slug,
    content,
    ...sanitizedData,
  };
}

export function getAllMethodSlugs() {
  const fileNames = fs.readdirSync(methodsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
}

// Cas d'usage
export function getAllUsages() {
  const fileNames = fs.readdirSync(usagesDirectory);
  const allUsagesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(usagesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    };
  });

  return allUsagesData;
}

export function getUsagesBySlugs(slugs) {
    if (!slugs) {
      return [];
    }
    return slugs.map((slug) => {
      const usage = getUsageBySlug(slug);
      return {
        ...usage,
        slug,
      };
    });
  }

export function getUsageBySlug(slug) {
  const fullPath = path.join(usagesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const relatedMethods = getAllMethods().filter(
    (method) => method.usages && method.usages.includes(slug)
  );

  return {
    slug,
    ...data,
    content,
    relatedMethods,
  };
}

export function getAllUsageSlugs() {
  const fileNames = fs.readdirSync(usagesDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
}

// Jeux de données
export function getAllDatasets() {
  const fileNames = fs.readdirSync(datasetsDirectory);
  const allDatasetsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(datasetsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    };
  });

  return allDatasetsData;
}

export function getDatasetsBySlugs(slugs) {
    if (!slugs || !Array.isArray(slugs)) {
      return [];
    }
    
    return slugs.map((slug) => {
      const dataset = getDatasetsBySlugs(slug);
      return {
        ...dataset,
        slug,
      };
    });
  }
   

export async function getStaticProps({ params }) {
    const method = getMethodBySlug(params.slug);
    const usages = getUsagesBySlugs(method.usages);
    const datasets = getDatasetsBySlugs(method.datasets); // Ajoutez cette ligne
    const allMethods = getAllMethods();
    const tags = [...new Set(allMethods.flatMap((method) => method.tags))];
    const type = [...new Set(allMethods.map((method) => method.type))];
    return {
      props: {
        method,
        usages,
        datasets,
        tags,
        type,
      },
    };
  }
