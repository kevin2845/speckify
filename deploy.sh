
sudo ./cli/decky plugin build .

sudo rsync ./out/speckify.zip deck@deck:/home/deck/homebrew/plugins/

ssh deck@deck 'unzip /home/deck/homebrew/plugins/speckify.zip'
