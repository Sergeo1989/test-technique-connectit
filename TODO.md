# TODO — améliorations identifiées, volontairement hors scope

Ces points ont été **étudiés pendant le développement** mais **laissés de côté
sciemment** : ils sortent du périmètre des deux exercices (pagination/filtres et
création/édition) et ajouteraient des dépendances ou de la complexité sans
rapport avec ce qui est demandé. Ils sont listés ici pour montrer qu'ils ont été
pris en compte, pas oubliés.

## Sécurité / prod-readiness

- **Rate limiting** — câbler `@nestjs/throttler` (déjà présent en dépendance) :
  `ThrottlerModule.forRoot([...])` + un `APP_GUARD` global.
- **CORS restreint** — aujourd'hui `origin: "*"` ; le limiter à l'origine du
  frontend via une clé de config `CORS_ORIGIN`.
- **En-têtes de sécurité** — `helmet()` dans le bootstrap.
- **Authentification / autorisation (RBAC)** — hors scope d'un test CRUD.

## Autres

- **Documentation OpenAPI/Swagger** (`@nestjs/swagger`).
- **Pagination par curseur** + **observabilité** — pertinents uniquement à
  l'échelle ; l'offset suffit ici.

## Qualité & tests (identifiées, différées)

Pistes pour renforcer encore la base existante (déjà couverte par des tests
unitaires + intégration HTTP) ; différées pour ne pas alourdir le livrable.

- **E2e contre un vrai SQLite** (DB jetable) en complément des tests qui mockent
  Prisma — fermerait l'angle mort que les mocks laissent.
- **Test de rendu** (Angular `TestBed`) sur le composant tableau, en plus des
  tests de logique en instanciation directe.
- **Seuils de couverture** appliqués dans la config Jest.
- **Factoriser** le chargement des listes déroulantes (langage/type), aujourd'hui
  dupliqué entre la page liste et la page formulaire.

> Le reste (intégrité en base, contrat de sortie, gestion d'erreurs centralisée,
> tests unitaires + intégration) a été traité dans le code.
