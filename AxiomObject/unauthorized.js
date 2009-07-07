function unauthorized() {
    res.redirect('/roster/login'+((req.data.http_referer)?'?came_from='+req.data.http_referer:''));
}