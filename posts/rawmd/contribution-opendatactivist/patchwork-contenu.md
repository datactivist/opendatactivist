## Comment avoir une image de fond sur la page de présentation des canvas ?

Pour qu'une image apparaisse en fond du bloc de titre, vous devez télécharger une image dans le dossier images/canvas portant le même nom que votre canvas.
Pour le canvas pgd, vous devez avoir une image nommée pgd.png.

![](/images/contribution-opendatactivist/fondcanva.png)

## Comment ajouter les sections ?

Reprenez votre tableau des étapes, et pour chaque ligne créez un fichier markdown (sauf pour la première ligne "meta")

- 1 ligne = une section (un fichier markdown)
- 👉 Chaque section doit être nommée de la même manière que dans le champ ```filename```
- Bien ajouter l'extension .md  : ```[filename].md```

## Comment rédiger le contenu ?

Une fois dans une section (un fichier markdown), utiliser la syntaxe markdown

**Voici un exemple que vous pouvez copier-coller**

```markdown

## Titre de second niveau

### Titre de troisième niveau

*texte en italique*

**texte en gras**

[un lien](https://datactivist.coop)

```un-nom-de-fichier```

```markdown
Un bloc de code
<div> </div>
```


### Ajouter une image :

```
![image](/images/algo/1-1.png)
```

Pour ajouter l'image, il faut la téléverser dans Github. Créez un dossier ```nom-du-canvas``` contenant vos images, et [téléverser le dossier ici](https://github.com/datactivist/opendatactivist/tree/)main/public/images/canvas
