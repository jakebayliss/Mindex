using Android.App;
using Android.Content;
using Microsoft.Identity.Client;

namespace TodoApp.MAUI
{
	[Activity(Exported = true)]
	[IntentFilter(new[] { Intent.ActionView },
		Categories = new[] { Intent.CategoryBrowsable, Intent.CategoryDefault },
		DataHost = "auth",
		DataScheme = "msal7a4b572c-6712-4cc3-9229-12fdd3b9a903")]
	public class MsalActivity : BrowserTabActivity
	{
	}
}