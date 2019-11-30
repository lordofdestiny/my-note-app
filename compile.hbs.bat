for /r %%v in ("templates/*.hbs") do (   
    handlebars "%%~dpvtemplates\%%~nv.hbs" -f "%%~dpvtemplates\..\public\templates\%%~nv.js")