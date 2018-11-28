#!/bin/bash

# it just doesn't feel like it did before

filename=$1
echo $filename

enscript -X pslatin1 --margins=40:40:10:10 -f Times-Roman10  $filename -o $filename.ps

#enscript -r --margins=50:50:10:10 -f Times-Roman16  $filename -o $filename.ps
#enscript -f Times-Roman7 -2r $filename -o $filename.ps
#enscript -f Times-Roman10  $filename -o $filename.ps
ps2pdf $filename.ps
rm -f $filename.ps
mv $filename.pdf ~/testdump

