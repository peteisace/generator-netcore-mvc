using Microsoft.AspNetCore.Mvc;

namespace <%= namespace %>.<%= appName%>
{
    [Controller]
    public class HomeController : Controller
    {
        public async Task<IActionResult> Index()
        {
            return this.View();
        }
    }
}