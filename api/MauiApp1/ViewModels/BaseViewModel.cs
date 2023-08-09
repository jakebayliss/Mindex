using CommunityToolkit.Mvvm.ComponentModel;

namespace MauiApp1.ViewModels
{
	public partial class BaseViewModel : ObservableObject
	{
		public INavigation Navigation { get; set; }

		[ObservableProperty]
		bool isBusy;

		[ObservableProperty]
		string title;
	}
}
