import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export default async function handler(req, res) {
    const { query: { action, id, partners } } = req;

    const filePath = path.join(process.cwd(), 'public', 'sitedata', 'references_catalog.csv');
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const records = parse(fileContents, {
        columns: headers => headers.map(header => header.trim().replace(/^\uFEFF/, '').toLowerCase()),
        trim: true,
        skip_empty_lines: true,
        delimiter: ',',
    });

    const transformedRecords = records.map(record => {
        return {
            ...record,
            'team': record.team ? record.team.split(',') : [],
            'team-names': record['team-names'] ? record['team-names'].split(',').map(name => name.trim()) : [],
            'team-images': record['team-images'] ? record['team-images'].split(',').map(image => image.trim()) : [],
            'partners': record.partners ? record.partners.split(',').map(partner => partner.trim()) : [],
            'partner-name': record['partner-name'] ? record['partner-name'].split(',').map(name => name.trim()) : [],
            'partner-description': record['partner-description'] ? record['partner-description'].split('.,').map(description => description.trim()) : [],
            'partner-image': record['partner-image'] ? record['partner-image'].split(',').map(image => image.trim()) : [],
        };
    });

    // Ajout d'une condition pour gérer la recherche par partenaire
    if (action === 'getByPartner' && partners) {
        const filteredReferences = transformedRecords.filter(record => record.partners.includes(partners.trim().toLowerCase()));
        if (filteredReferences.length > 0) {
            res.status(200).json(filteredReferences);
        } else {
            res.status(404).json({ message: 'No references found for the given partner' });
        }
    } else if (action === 'list') {
        res.status(200).json(transformedRecords);
    } else if (action === 'get' && id) {
        const reference = transformedRecords.find(record => record.id === id.trim().toLowerCase());
        if (reference) {
            res.status(200).json(reference);
        } else {
            res.status(404).json({ message: 'Reference not found' });
        }
    }
}
