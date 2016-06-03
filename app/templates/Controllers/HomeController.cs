using Microsoft.AspNetCore.Mvc;

namespace <%= namespace %>.<%= appName%>
{
    [Controller]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return this.View();
        }
    }
}