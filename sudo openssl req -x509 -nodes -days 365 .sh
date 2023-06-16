sudo openssl req -new -newkey rsa:2048 -nodes -out /Users/jasonbourne/Downloads/ssl/server.csr -keyout /Users/jasonbourne/Downloads/ssl/server.key -subj "/C=GN/ST=Kipe/L=Conakry/O=CITS/OU=IT/CN=Creative IT Solution"
sudo openssl req -inform DER -in /Users/jasonbourne/Downloads/ssl/server.csr -out /Users/jasonbourne/Downloads/ssl/server.pem
sudo openssl req -inform DER -in /Users/jasonbourne/Downloads/ssl/server.key -out /Users/jasonbourne/Downloads/ssl/server.pem


sudo openssl req -inform DER -in /Users/jasonbourne/Downloads/ssl/server.crt -out /Users/jasonbourne/Downloads/ssl/server.pem


sudo openssl x509 -inform DER -outform PEM -in /Users/jasonbourne/Downloads/ssl/server.crt -out /Users/jasonbourne/Downloads/ssl/server.pem

openssl x509 -in /Users/jasonbourne/Downloads/ssl/server.crt -text -noout

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /Users/jasonbourne/Downloads/ssl/server.key -out /Users/jasonbourne/Downloads/ssl/server.crt -subj "/C=GN/ST=Kipe/L=Conakry/O=CITS/OU=IT/CN=Creative IT Solution"


sudo openssl req -inform DER -in /Users/jasonbourne/Downloads/ssl/server.pem -out /Users/jasonbourne/Downloads/ssl/server.csr


sudo openssl x509 -x509toreq -in /Users/jasonbourne/Downloads/ssl/server.crt -signkey /Users/jasonbourne/Downloads/ssl/server.key -out /Users/jasonbourne/Downloads/ssl/server.csr 

sudo openssl req -out /Users/jasonbourne/Downloads/ssl/server.csr -key /Users/jasonbourne/Downloads/ssl/server.key -new