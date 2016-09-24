using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace <%= namespace %>.<%= appName%>
{
    [Controller]
    public class HomeController : Controller
    {
        public async Task<IActionResult> Index()
        {            
            await Task.Yield();
            return this.View();
        }
    }
}