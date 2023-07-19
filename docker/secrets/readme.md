## DESC

Folder contains credentials for different docker services e.g. postgres password
(not included in VCS - needs to be initialized by user)

Naming convention: 
<SERVICE_NAME>_pw.txt

Example for generating a secret for the PostgreSQL service:
```shell
echo "supersecretPassword" > postgres_pw.txt
```
