# Pour commit #

* Passer le ticket en inprogress (trello)
* Vérifier la branche si "frontoffice" ou "backoffice" selon le dev
* Mettre à jour la branche 'git pull --rebase'
* Commencer une nouvelle branche à partir de "frontoffice" ou "backoffice" en faisant 'git checkout -b NOMDEBRANCHE'
* Faire le dev
* Quand c'est finis on peut voir les modifications avec 'git status'
* Pour ajouter des fichiers créer 'git add cheminduficchier'
* Pour valider les modifications 'git stage -p' et 'y' pour oui et 'n' pour non
* Faire le commit avec le message formaté comme ceci 'git commit -m "[Evo ou Fix][FO ou BO] Nomdebranche - message expliquatif"'
* Faire un push 'git push origin NOMDEBRANCHE'
* Créer la pull request sur bitbucket
* Passer le ticket en resolved
* Passer au prochain ticket en suivant l'ordre déjà établit